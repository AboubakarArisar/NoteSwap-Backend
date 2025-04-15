const jwt = require("jsonwebtoken");
const studentSchema = require("../models/student.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await studentSchema.findOne({ email: decoded.email });
    if (!student) return res.status(401).json({ message: "User not found" });

    req.user = student;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = auth;
