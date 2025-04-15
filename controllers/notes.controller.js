const notesSchema = require("../models/notes.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const uploadOnCloudinary = require("../utils/cloudinary");

const uploadNote = catchAsyncError(async (req, res) => {
  try {
    const notesData = req.body;
    const noteFile = req.file;

    const fileUrl = await uploadOnCloudinary(noteFile.path);
    if (!fileUrl) {
      res.status(404).json({
        success: false,
        message: "Error occured while uploading file",
      });
      return;
    }

    const newNote = await notesSchema.create({
      ...notesData,
      fileUrl: fileUrl,
    });
    if (!newNote) {
      res.status(404).json({
        success: false,
        message: "Error occured while uploading file",
      });
      return;
    }
    await newNote.save();
    res.status(200).json({
      success: true,
      message: "Note uploaded successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getNoteByID = catchAsyncError(async (req, res) => {
  try {
    const noteId = req.params.id;
    const searchedNote = await notesSchema.findById(noteId);
    if (!searchedNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: searchedNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getAllNotesByDepartment = catchAsyncError(async (req, res) => {
  try {
    const department = req.params.department;
    const searchedNotes = await notesSchema.find({ department: department });
    if (!searchedNotes) {
      res.status(404).json({
        success: false,
        message: "Notes not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: searchedNotes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getAllNotes = catchAsyncError(async (req, res) => {
  try {
    const searchedNotes = await notesSchema.find();
    if (!searchedNotes) {
      res.status(404).json({
        success: false,
        message: "Notes not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: searchedNotes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
});

const downloadNote = catchAsyncError(async (req, res) => {
  const noteId = req.params.id;
  const searchedNote = await notesSchema.findById(noteId);
  if (!searchedNote) {
    res.status(404).json({
      success: false,
      message: "Note not found",
    });
    return;
  }
  const fileUrl = searchedNote.fileURL;
  res.status(200).json({
    success: true,
    message: "File URL fetched successfully",
    data: fileUrl,
  });
});

module.exports = {
  uploadNote,
  getNoteByID,
  getAllNotesByDepartment,
  getAllNotes,
};
