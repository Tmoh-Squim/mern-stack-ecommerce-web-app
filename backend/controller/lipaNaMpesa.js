const request=require("request")
const {getTimestamp} = require("../utils/timestamp.js")
const ngrok = require("ngrok")
//const ErrorHandler = require("../utils/ErrorHandler");
//const catchAsyncErrors = require("../middleware/catchAsyncErrors");

 const initiateSTKPush = async(req, res) => {
    try{

        const { phone, amount, Order_Id } = req.body;
        //const {amount} = req.body.amount
        //const {phone} = req.body.phone
        //const {Order_Id} = req.body.Order_Id
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')
        // create callback url
        const callback_url = await ngrok.connect(9000);
        const api = ngrok.getApi();
        await api.listTunnels();


        console.log("callback ",callback_url)
        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": phone,
                    "PartyB": process.env.BUSINESS_SHORT_CODE,
                    "PhoneNumber": phone,
                    "CallBackURL": `${callback_url}/api/stkPushCallback/${Order_Id}`,
                    "AccountReference": "squims-tech online shopping",
                    "TransactionDesc": "Paid online",
                }
            },
            function (e, response, body) {
                if (e) {
                    console.error(e)
                    res.status(503).json({
                        message: "Error with the stk push",
                        error: e.message
                    });
                } else {
                    res.status(200).json(body);
                }
            }
        )
    }catch (e) {
        console.error("Error while trying to create LipaNaMpesa details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error : e
        })
   }
}

 const stkPushCallback = catchAsyncErrors(async(req, res) => {
    try{

    //    order id
        //callback details

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
                 }   = req.body.Body.stkCallback

    //     get the meta data from the meta
        const meta = Object.values(await CallbackMetadata.Item)
        const PhoneNumber = meta.find(o => o.Name === 'PhoneNumber').Value.toString()
        const Amount = meta.find(o => o.Name === 'Amount').Value.toString()
        const MpesaReceiptNumber = meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString()
        const Order_Id = meta.find(o => o.Name === 'Order_Id').Value.toString()
        const TransactionDate = meta.find(o => o.Name === 'TransactionDate').Value.toString()

        // do something with the data
        console.log("-".repeat(20)," OUTPUT IN THE CALLBACK ", "-".repeat(20))
        console.log(`
            Order_Id : ${Order_Id},
            MerchantRequestID : ${MerchantRequestID},
            CheckoutRequestID: ${CheckoutRequestID},
            ResultCode: ${ResultCode},
            ResultDesc: ${ResultDesc},
            PhoneNumber : ${PhoneNumber},
            Amount: ${Amount}, 
            MpesaReceiptNumber: ${MpesaReceiptNumber},
            TransactionDate : ${TransactionDate}
        `)

        res.json(true)

    }catch (e) {
        console.error("Error while trying to update LipaNaMpesa details from the callback",e)
        res.status(503).send({
            message:"Something went wrong with the callback",
            error : e.message
        })
    }
}
)

 const confirmPayment = catchAsyncErrors()
async(req, res) => {
    try{


        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')


        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode":process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "CheckoutRequestID": req.params.CheckoutRequestID,

                }
            },
            function (error, response, body) {
                if (error) {
                    console.log(error)
                    res.status(503).send({
                        message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
                        error : error
                    })
                } else {
                    res.status(200).json(body)
                }
            }
        )
    }catch (e) {
        console.error("Error while trying to create LipaNaMpesa details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error : e
        })
    }
}
module.exports={initiateSTKPush,confirmPayment,stkPushCallback}


