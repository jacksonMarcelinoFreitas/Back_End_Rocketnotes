const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

//onde a imagem chega
const TMP_FOLDER = path.resolve(__dirname, "..","..","tmp");

//onde a imagem vai ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


//biblioteca para fazer o upload
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("Hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};


module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}