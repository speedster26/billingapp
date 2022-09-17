// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
import NextCors from 'nextjs-cors';
import Products from "../../models/Products";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  // Validate paytm checksum
  var paytmChecksum = "";
  var paytmParams = {}
  const received_data = req.body;
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
  console.log(isValidChecksum);
  if (!isValidChecksum) {
    console.log(req.body.ORDERID);
    await Order.findOneAndDelete({ orderId: req.body.ORDERID })
    res.status(500).send("Some error occurred")
    return
  }
  else if (req.body.STATUS === "TXN_SUCCESS") {
      console.log(req.body);
      let order = await Order.findOne({ orderId: req.body.ORDERID });
      // Update order status in db
      order.orderStatus = 'PAID'
      order.paymentInfo = req.body
      const { orderItems } = order
      await Order.findByIdAndUpdate(order._id, order)
      // Update the available qty in products db
      for (let item of orderItems) {
        let pro = await Products.findById(item._id);
        pro.availableQty = pro.availableQty - item.qty
        await Products.findByIdAndUpdate(item._id, pro)
      }
      // Redirect user to payment confirmation page
      res.redirect(`/confirm?id=${req.body.ORDERID}`, 200);
    
  }
}
export default connectDb(handler)
