import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/uploads");
  },
  filename(req, file, cb) {
    null, `${file.filename}-${Date.now()}.${path.extname(file.originalname)}`;
  },
});

function checkFileTypes(file, cb) {
  const filetype = /jpeg|png|jpg/;
  const extname = filetype.text(path.extname(file.originalname).toLowerCase());
  const mimetype = filetype.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Obly Images Are Allowed");
  }
}

const upload  =multer({
    storage,
    fileFilter : function(req,file,cb){
        checkFileTypes(file,cb)
    }
})

router.post('/',upload.single('image'),(req,res)=>{
    res.send(`/${req.file.path}`)
})
export default router