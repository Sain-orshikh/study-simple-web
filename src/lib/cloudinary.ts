// filepath: c:\Users\xx\Desktop\study-simple-web\src\lib\cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Initialize cloudinary configuration once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload a file buffer
export const uploadBuffer = async (buffer: Buffer, folder: string = 'uploads') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    const Readable = require('stream').Readable;
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Helper function to upload a URL directly
export const uploadUrl = async (url: string, folder: string = 'uploads') => {
  return await cloudinary.uploader.upload(url, { folder });
};

export default cloudinary;