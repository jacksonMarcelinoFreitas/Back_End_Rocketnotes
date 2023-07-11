const uploadConfig = require("../configs/upload");
const path = require("path");
const fs = require("fs");

class DiskStorage{
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try{
      //verifica o estado do arquivo (disponível, aberto)
      await fs.promises.stat(filePath);
    } catch {
      return
    }

    //remove o arquivo
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;