// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Products from "../../models/Products";
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Products({
                    title: req.body[i].title,
                    price: req.body[i].price,
                    desc: req.body[i].desc,
                    image: req.body[i].image,
                    serNo: req.body[i].serNo,
                    category: req.body[i].category,
                    color: req.body[i].color,
                    size: req.body[i].size,
                    availableQty: req.body[i].availableQty,
                    tax: req.body[i].tax,
                    storeId: req.body[i].storeId
                })
                await p.save();
            }
            res.status(200).json({ success: true})
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({success: false,error})
    }
}
export default connectDb(handler)