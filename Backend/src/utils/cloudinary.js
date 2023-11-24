const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: "dujmaxztw",
//   api_key: "513158386266725",
//   api_secret: "vK3nReg8EHaoxi6RL-dutza0Axw",
// });

const cloudinaryUploader = async (localPath) => {
  try {
    if (!localPath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localPath);
    console.log("File uploaded to cloudinary successfully");
    return response;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log("Cloudinary file upload error: ", error);
    return null;
  }
};

module.exports = { cloudinaryUploader };
