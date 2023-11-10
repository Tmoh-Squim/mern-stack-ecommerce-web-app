const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const token = req.headers.authorization;
    console.log('token',token)
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded._id);

    next();
});


exports.isSeller = catchAsyncErrors(async(req,res,next) => {

    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

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