// // middleware.js
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
