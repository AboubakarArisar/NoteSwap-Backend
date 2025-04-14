const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabse = require("./database/connection");
//setting up config file

//connecting to db
connectDatabse();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the backend of noteswap",
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is on port ${process.env.PORT} `);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error name : ${err.name} , Error msg ${err.message}  `);
  console.log("Shutting down Server due to  Rejection Errors");
  server.close(() => {
    process.exit();
  });
});
