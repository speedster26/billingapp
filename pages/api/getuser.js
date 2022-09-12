// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose"
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {
            let u = jwt.verify(req.body.token, process.env.JWT_SECRET);
            let user = await User.findOne({ miid: u.miid });
            if(user){
                res.status(200).json({ success: true, user })
            }
            else{
                res.status(200).json({ success: false, error: "Some unexpected error" })
            }
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({success: false,error})
    }
}
export default connectDb(handler)