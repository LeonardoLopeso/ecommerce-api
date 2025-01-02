import fs from "fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage";

export class UploadFileService {

  constructor(private path: string = "") { }

  async upload(base64: string): Promise<string> {
    const fileBuffer = Buffer.from(base64, 'base64');

    const fileName = "image.png";
    fs.writeFileSync(fileName, fileBuffer);

    const bucket = getStorage().bucket("e-commerce-fe88e.firebasestorage.app");
    const uploadResponse = await bucket.upload(fileName, {
      destination: this.path + fileName
    });

    return getDownloadURL(uploadResponse[0])
  }
}