const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3500;

app.use("/", express.static(path.join(__dirname, "/public"))); //Adds the path to make it accessible
app.use("/", require("./routes/root"));

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
app.listen(PORT, () => {
  console.log(`Running On ${PORT}`);
});
