const express = require("express");
const categoryModel = require("../model/categories.js")
const ErrorHandler = require("../utils/ErrorHandler.js")
const cloudinary = require("../utils/cloudinary")
const router = express.Router()
const {upload} = require("../multer")

router.post("/create-category",upload.single("image"),async(req,res,next)=>{
    try {
        const {name} = req.body;
        if(!name){
            return next(new ErrorHandler("Category name can't be blank", 400));
        }
        const check = await categoryModel.findOne({name});
        if(check){
            return next(new ErrorHandler("Category already exists!", 400));
        }

        const file = req.file;

        if(!file){
            return next(new ErrorHandler("Please upload category image", 400));
        }
        const result = await cloudinary.uploader.upload(file.path);
        const fileUrl = result.secure_url;

        const newCategory = {
            name:name,
            image:fileUrl
        }
        const category = await categoryModel.create(newCategory)

        res.status(200).send({
            success:true,
            message:"Category created successfully",
            category
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}
)


module.exports = router