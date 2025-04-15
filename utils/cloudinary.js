require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;
    // console.log("localfilePath : ", localfilePath);
    const res = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });

    // console.log("response : ", res);
    fs.unlinkSync(localfilePath);
    return res.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    if (fs.existsSync(localfilePath)) fs.unlinkSync(localfilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;
