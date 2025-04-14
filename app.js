const express = require("express");
const app = new express();
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const notesRoutes = require("./routes/notes.routes");
const studentRoutes = require("./routes/student.routes");
app.use(express.json());
app.use(cors());

app.use(errorMiddleware);
app.use("/notes", notesRoutes);
app.use("/students", studentRoutes);

module.exports = app;
