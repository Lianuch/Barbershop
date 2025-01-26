import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDI_NAME,
  api_key: process.env.CLOUDI_API_KEY,
  api_secret: process.env.CLOUDI_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export { cloudinary, upload };
