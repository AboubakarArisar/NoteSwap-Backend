const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const notesController = require("../controllers/notes.controller");
const auth = require("../middlewares/auth");

router.post("/upload", auth, upload.single("file"), notesController.uploadNote);

router.get("/note/:id", notesController.getNoteByID);
router.get("/department/:department", notesController.getAllNotesByDepartment);
router.get("/", notesController.getAllNotes);
router.get("/download/:id", auth, notesController.downloadNote);
router.post("/upvote/:id", auth, notesController.upvoteNote);
router.post("/downvote/:id", auth, notesController.downvoteNote);

module.exports = router;
