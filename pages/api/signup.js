// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const {name,miid,password} = req.body
            let al = await User.findOne({miid})
            if(al===null){
                let u = new User({miid,name,password:CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString()});
                u.save();
                res.status(200).json({ success: true})
            }
            else{
                res.status(200).json({ success: false, error: "User already registered" })
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