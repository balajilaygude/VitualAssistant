import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export async function UploadOnClaudinary(filepath) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);
    fs.unlinkSync(filepath);
    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filepath);
    return res.status(400).json({
        message:error.message
    })
  }
}
