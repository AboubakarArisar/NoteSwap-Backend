const notesSchema = require("../models/notes.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const uploadOnCloudinary = require("../utils/cloudinary");
const updatePoints = require("../utils/updatePoints");

const uploadNote = catchAsyncError(async (req, res) => {
  try {
    const notesData = req.body;
    const noteFile = req.file;

    const fileUrl = await uploadOnCloudinary(noteFile.path);
    // console.log(fileUrl);
    if (!fileUrl) {
      res.status(404).json({
        success: false,
        message: "Error occured while uploading file",
      });
      return;
    }

    const existingNote = await notesSchema.findOne({
      title: notesData.title,
      department: notesData.department,
      tags: notesData.tags,
    });

    if (existingNote) {
      return res.status(400).json({
        success: false,
        message: "Note already exists.",
      });
    }

    const newNote = await notesSchema.create({
      ...notesData,
      uploadedBy: req.user._id,
      fileURL: fileUrl,
    });

    if (!newNote) {
      res.status(404).json({
        success: false,
        message: "Error occured while uploading file",
      });
      return;
    }
    // console.log("before update");
    const update = await updatePoints(req.user._id, 30);

    // console.log("after update");
    await newNote.save();
    res.status(200).json({
      success: true,
      message: "Note uploaded successfully",
      data: newNote,
      updatedUser: update,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", msg: error });
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
  try {
    const noteId = req.params.id;

    const searchedNote = await notesSchema.findById(noteId);

    if (!searchedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // console.log(searchedNote);
    const fileUrl = searchedNote.fileURL;

    if (!fileUrl) {
      return res.status(404).json({
        success: false,
        message: "File URL not found",
      });
    }

    const update = await updatePoints(req.user._id, -10);

    res.status(200).json({
      success: true,
      message: "Note URL retrieved successfully",
      fileUrl: fileUrl,
      updatedUser: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

const upvoteNote = catchAsyncError(async (req, res) => {
  const noteId = req.params.id;
  const note = await notesSchema.findById(noteId);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }
  note.upvotes += 1;
  await note.save();
  res.status(200).json({
    success: true,
    message: "Note upvoted successfully",
    data: note,
  });
});

const downvoteNote = catchAsyncError(async (req, res) => {
  const noteId = req.params.id;
  const note = await notesSchema.findById(noteId);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }
  note.downvotes += 1;
  await note.save();
  res.status(200).json({
    success: true,
    message: "Note downvoted successfully",
    data: note,
  });
});

module.exports = {
  uploadNote,
  getNoteByID,
  getAllNotesByDepartment,
  getAllNotes,
  downloadNote,
  upvoteNote,
  downvoteNote,
};
