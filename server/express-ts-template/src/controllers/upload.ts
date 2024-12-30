import multiparty from 'multiparty'
import { Request, Response } from "express";
import { STATIC_TEMPORARY, STATIC_FILES } from "./constans";
import path from "path"
import fs from "fs-extra"
export class Upload {
  static async upload(req: Request, res: Response): Promise<void> {

    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      let chunk = files.file[0];
      let hash = fields.hash[0];
      let name = fields.name[0];
      let fileName = fields.fileName[0];
      let ext = path.extname(fileName);
      let fileRes = fileName.split(ext)[0];
      let dir = path.join(STATIC_TEMPORARY, fileRes + "-" + hash);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      const buffer = fs.readFileSync(chunk.path);
      const ws = fs.createWriteStream(`${dir}/${name}`)
      ws.write(buffer)
      ws.close()
    })
    res.send({
      resultCode: 200,
      message: "ok",
      hideMsg: true
    });
  }
  static async merge(req: Request, res: Response): Promise<void> {


    let { fileName, hash } = req.query;
    const ext = path.extname(fileName as string);
    const fileNameStart = (fileName as string).split(ext)[0];
    try {

      let dir = path.join(STATIC_TEMPORARY, "/" + fileNameStart + "-" + hash)
      console.log(dir)
      const bufferList: Buffer[] = [];
      fs.readdirSync(dir).forEach((item, index) => {

        const buffer = fs.readFileSync(path.join(dir, '/' + item))
        bufferList.push(buffer)
      })
      const concatenatedBuffer = Buffer.concat(bufferList);
      const ws = fs.createWriteStream(path.join(STATIC_FILES, "/" + fileNameStart + "-" + hash + ext))
      ws.write(concatenatedBuffer)
      ws.close()
      res.send({
        resultCode: 200,
        message: "ok",
        data: { bufferList }
      });
    } catch (error) {
      console.error(error)
    }


  }
}