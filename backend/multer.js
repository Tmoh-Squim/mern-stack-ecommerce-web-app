const multer = require("multer");
const ErrorHandler=require("./utils/ErrorHandler.js")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads/");
    },
    filename: function (req,file,cb) {
        //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
       // const filename = file.originalname;
        cb(null,file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    },
});

exports.upload = multer({storage: storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new ErrorHandler("file type is not valide"))
        }
    }
});
