import connectDb from '../../middleware/mongoose';
import Order from '../../models/Order';
const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import NextCors from 'nextjs-cors';

const handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });
    // save order
    const order = new Order({
        orderId: req.body.orderId,
        custInfo: req.body.custInfo,
        custAddress: req.body.custAddress,
        orderItems: req.body.orderItems,
        orderTotal: req.body.orderTotal,
        orderStatus: req.body.orderStatus,
        operatorId: req.body.operatorId,
    });
    await order.save();
    
    var paytmParams = {};

    paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        "websiteName": "YOUR_WEBSITE_NAME",
        "orderId": req.body.orderId,
        "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        "txnAmount": {
            "value": req.body.orderTotal,
            "currency": "INR",
        },
        "userInfo": {
            "custId": "CUST_001",
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

    paytmParams.head = {
        "signature": checksum
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
        return new Promise((resolve, reject) => {
            try {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.orderId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true;
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();

            } catch (error) {
                reject(error);
            }

        })   
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
}
export default connectDb(handler)