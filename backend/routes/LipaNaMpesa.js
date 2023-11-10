const express = require("express")
const router = express.Router()
const {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment


} = require("../controller/lipaNaMpesa")


const {accessToken} = require("../middleware/genenerateAccessToken")

router.post('/stkPush',accessToken,initiateSTKPush)
router.post('/stkPushCallback/:Order_ID',stkPushCallback)
router.get('/token',accessToken)
router.post('/confirmPayment/:CheckoutRequestID',accessToken,confirmPayment)

module.exports=router