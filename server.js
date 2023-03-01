require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

console.log(process.env.NODE_ENV);
app.use("/", express.static(path.join(__dirname, "/public"))); //Adds the path to make it accessible
app.use("/", require("./routes/root"));

app.use("/users", require("./routes/userRoutes"));
app.use("/rooms", require("./routes/roomRoutes"));
app.use("/restaurant", require("./routes/resturantRoute"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "not found" });
  } else {
    res.type("text").send("404:Page Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected To Db");
  app.listen(PORT, () => {
    console.log(`Running On ${PORT}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
    "mangoErrLog.log"
  );
});
