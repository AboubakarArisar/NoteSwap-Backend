const studentSchema = require("../models/student.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getAllStudents = catchAsyncError(async (req, res, next) => {
  const allStudents = await studentSchema.find();
  if (allStudents.length == 0) {
    res.status(200).json({
      success: false,
      message: "No Students",
    });
  } else
    res.status(200).json({
      success: true,
      students: allStudents,
    });
});

const signup = catchAsyncError(async (req, res, next) => {
  const { email, password, username, department } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingStudent = await studentSchema.findOne({ username: username });
    if (existingStudent) {
      res.status(401).json({
        success: false,
        message: "Student already exists",
        user: existingStudent,
      });
      return existingStudent;
    }

    const studentCreated = await studentSchema.create({
      email,
      password: hashedPassword,
      username,
      department,
    });

    await studentCreated.save();

    res.status(200).json({
      success: true,
      studentCreated,
    });
  } catch (exp) {
    res.status(200).json({
      success: false,
      message: "Entered Existing Name",
    });
  }
});

const login = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  // console.log("password : ", password);
  const student = await studentSchema.findOne({ email });
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // console.log("user password : ", student.password);
  const isMatch = await bcrypt.compare(password, student.password);

  if (isMatch) {
    const jwtToken = jwt.sign(
      {
        name: student.username,
        email: student.email,
        department: student.department,
        points: student.points,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      token: jwtToken,
      student,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "password incorrect",
    });
  }
});

const getLeaderboard = catchAsyncError(async (req, res) => {
  const topStudents = await studentSchema
    .find({}, "username points department")
    .sort({ points: -1 });

  res.status(200).json({
    success: true,
    data: topStudents,
  });
});

module.exports = {
  signup,
  login,
  getAllStudents,
  getLeaderboard,
};
