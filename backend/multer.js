const multer = require("multer");
const ErrorHandler=require("./utils/ErrorHandler.js")
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"https://github.com/Tmoh-Squim/mern-stack-ecommerce-web-app/tree/main/backend/uploads");
    },
    filename: function (req,file,cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        cb(null,filename + "-" + uniqueSuffix + ".png");
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
