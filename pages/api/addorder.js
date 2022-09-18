// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order";
import Products from "../../models/Products";
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            const { orderId, custInfo, custAddress, orderItems, orderTotal, orderStatus, operatorId, paymentMethod} = req.body.order
            let order = new Order({
                orderId,
                custInfo,
                custAddress,
                orderItems,
                orderTotal,
                orderStatus,
                operatorId,
                paymentMethod
            })
            await order.save()
            for (let item of orderItems) {
                let pro = await Products.findById(item._id);
                pro.availableQty = pro.availableQty - item.qty
                await Products.findByIdAndUpdate(item._id, pro)
            }
            res.status(200).json({ success: true , orderId})
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({success: false,error})
    }
}
export default connectDb(handler)