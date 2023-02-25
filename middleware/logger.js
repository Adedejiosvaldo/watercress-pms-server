const path = require("path");
const fsPromise = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// This is a middleware function that will be used to log all requests to the server
const logEvents = async (message, logFileName) => {
  const dateItem = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logMessage = `${dateItem}\t${message}\t${uuidv4()}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logMessage
    );
  } catch (error) {
    console.log(error.Message);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};
module.exports = { logger, logEvents };
