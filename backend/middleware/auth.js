const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log('token', token);

        if (!token) {
            return res.send({message:'Authorization token not provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("decoded token",decoded)
        console.log(decoded.exp)

        if (!decoded || !decoded._id) {
            return res.send({message:'Invalid token'});
        }

        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid token', 401));
    }
});



exports.isSeller = catchAsyncErrors(async(req,res,next) => {

    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded._id);

    next();
});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}