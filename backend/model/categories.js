const mongoose = require("mongoose");

const categoryShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = new mongoose.model("categories",categoryShema)