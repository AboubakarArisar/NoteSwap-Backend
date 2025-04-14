const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the Backend of NoteSwap" });
});
app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
