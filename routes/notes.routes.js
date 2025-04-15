const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const notesController = require("../controllers/notes.controller");
const auth = require("../middlewares/auth");

//files will be document uploaded to multer middleware not the images only document

router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
router.get("/:id", notesController.getNoteByID);
router.get("/:department", notesController.getAllNotesByDepartment);
router.get("/", notesController.getAllNotes);
router.get('/download/:id', auth, notesController.downloadNote);
module.exports = router;
