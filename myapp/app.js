var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");
const fs = require("fs");
const dbURL =
  "mongodb+srv://sourav4253:sourav_4253@cluster0.su3zk.mongodb.net/Url?retryWrites=true&w=majority";
mongoose.connect(
  dbURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(8080);
    console.log("db connected");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// for multiple image upload in node js using ejs
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("files", 12);
app.post("/upload", (req, res, next) => {
  upload(req, res, function (err) {
    if (err) return res.send("something went wrong");
    res.send("upload complete");
  });
});
app.get("/imageupload", (req, res) => {
  res.render("index", { title: "hii" });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(require("./routes/Category"));
app.use(require("./routes/Url"));
app.use(require("./routes/user"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
