import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Yelpcamp',
    allowed_formats: ['jpeg', 'png', 'jpg']
  } as any
});

export default cloudinary;
