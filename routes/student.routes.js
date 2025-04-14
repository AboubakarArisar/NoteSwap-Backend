const express = require("express");
const studentController = require("../controllers/student.controller");
const router = express.Router();

router.post("/signin", studentController.login);
router.post("/signup", studentController.signup);
router.get("/all", studentController.getAllStudents);

module.exports = router;
