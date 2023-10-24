const express = require("express")
const router = express.Router()
import {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment


} from "../controller/lipaNaMpesa.js";


import {accessToken} from "../middleware/genenerateAccessToken.js";

router.route('/stkPush').post(accessToken,initiateSTKPush)
router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
router.route("/token").get(accessToken)
router.route('/confirmPayment/:CheckoutRequestID').post(accessToken,confirmPayment)

module.exports=router