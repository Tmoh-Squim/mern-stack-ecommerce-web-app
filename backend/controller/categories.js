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
        const public_id = result.public_id;

        const newCategory = {
            name:name,
            image:fileUrl,
            public_id:public_id
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

//fetching categories...
router.get("/categories",async(req,res,next)=>{
    try {
        const categories = await categoryModel.find({})

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})
//updating the category....
router.put("/update-category/:id",upload.single("image"), async(req,res,next)=>{
    try {        
        const {name} = req.body;
        const {id} = req.params;
        const check = await categoryModel.findById(id);

        if(!check){
            return next(new ErrorHandler("Category does not exist", 400));
        }

        if(req.file && req.body){
            const file = req.file;

             await cloudinary.uploader.destroy(check?.public_id);
            const result = await cloudinary.uploader.upload(file.path);
            
            const imageUrl=result.secure_url;
            const public_id = result.public_id;
          const category =  await categoryModel.findByIdAndUpdate(id,{image:imageUrl,name:name,public_id:public_id},{new:true});

            res.send({
                success:true,
                message:"Category updated successfully",
                category
            })
        }
        else if(!req.body && req.file){
            const file = req.file;

             await cloudinary.uploader.destroy(check?.public_id);
            const result = await cloudinary.uploader.upload(file.path);
            
            const imageUrl=result.secure_url;
            const public_id = result.public_id;
          const category =  await categoryModel.findByIdAndUpdate(id,{image:imageUrl,public_id:public_id},{new:true});

            res.send({
                success:true,
                message:"Category updated successfully",
                category
            })
        }
        //else
        else if(req.body && !req.file){
            const category = await categoryModel.findByIdAndUpdate(id,{name:name},{new:true})

            res.send({
                success:true,
                message:"Category updated successfully",
                category
            })
    
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

router.delete("/delete-category/:id", async(req,res,next)=>{
    try {
        const {id} = req.params;

        const check = await categoryModel.findById(id)
        if(!check){
            return next(new ErrorHandler("Category does not exist", 400));
        }   

       // Delete the image from Cloudinary using the extracted ID
       await cloudinary.uploader.destroy(check?.public_id);

        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            message:"Category deleted Successfully"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})

module.exports = router