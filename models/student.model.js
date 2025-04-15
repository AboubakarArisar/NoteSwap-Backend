const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 50,
    },
    department: {
      type: String,
      requied: true,
    },
    username: {
      type: String,
      required: true,
    },
    noOfUploads: {
      type: Number,
      default: 0,
    },
    noOfDownloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
