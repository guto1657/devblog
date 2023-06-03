//imports
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

//cloudinary settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//setting up cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => {
    const folderName = `DEVBLOG/users/${req.username}`;
    return {
      folder: folderName,
      allowedFormats: ['jpg'],
      format: 'jpg',
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
