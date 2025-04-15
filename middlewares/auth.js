//auth middleware
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const catchAsyncError = require("./catchAsyncError");

const auth = catchAsyncError(async (req, res, next) => {
  try {
    const token = req.headers.authorization; //token in headers with Bearer token
    if (token) {
      token = token.split(" ")[1];
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decodedToken.id);
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = student;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

module.exports = auth;
