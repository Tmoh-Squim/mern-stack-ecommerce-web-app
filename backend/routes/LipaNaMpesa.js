const express = require("express")
const router = express.Router()
const {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment


} = require("../controller/lipaNaMpesa.js")


const {accessToken} = require("../middleware/genenerateAccessToken.js")

router.route('/stkPush').post(accessToken,initiateSTKPush)
router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
router.route("/token").get(accessToken)
router.route('/confirmPayment/:CheckoutRequestID').post(accessToken,confirmPayment)

module.exports=router