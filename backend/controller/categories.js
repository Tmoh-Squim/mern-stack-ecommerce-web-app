const express = require("express");
const categoryModel = require("../model/categories.js")
const ErrorHandler = require("../utils/ErrorHandler.js")
const cloudinary = require("../utils/cloudinary")
const router = express.Router()
const {upload} = require("../multer")

//creating the category...
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

//updating the category....
router.put("/update-category", async(req,res,next)=>{
    try {
        const {name,id} = req.body;

        const check = await categoryModel.findById(id);

        if(!check){
            return next(new ErrorHandler("Category does not exist", 400));
        }

        if(req.file){
            await cloudinary.api.delete_derived([check.image.id]);
            await cloudinary.api.delete_by_tags(check.image.public_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl=result.secure_url;
          const category =  await check.updateOne({image:imageUrl,name})

            res.send({
                success:true,
                message:"Category updated successfully",
                category
            })
        }

        const category = await categoryModel.findByIdAndUpdate(id,{name:name})

        res.send({
            success:true,
            message:"Category updated successfully",
            category
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

router.delete("delete-category", async(req,res,next)=>{
    try {
        const {id} = req.body;

        const check = await categoryModel.findById(id)
        if(!check){
            return next(new ErrorHandler("Category does not exist", 400));
        }
        await cloudinary.api.delete_derived([check.image.id])
        await check.remove()
        
        res.status(200).send({
            message:"Category deleted Successfully"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

module.exports = router