const studentSchema = require("../models/student.model");

const updatePoints = async (studentId, pointsChange) => {
  console.log("student id:", studentId);
  console.log("points change:", pointsChange);

  if (!studentId) {
    throw new Error("Invalid student ID");
  }

  const updateFields = {
    $inc: { points: pointsChange },
  };

  if (pointsChange > 0) {
    updateFields.$inc.noOfUploads = 1;
  } else if (pointsChange < 0) {
    updateFields.$inc.noOfDownloads = 1;
  }

  const updatedStudent = await studentSchema.findByIdAndUpdate(
    studentId,
    updateFields,
    { new: true }
  );

  if (!updatedStudent) {
    throw new Error("Failed to update student points");
  }

  // console.log("Updated Student:", updatedStudent);
  return updatedStudent;
};

module.exports = updatePoints;
