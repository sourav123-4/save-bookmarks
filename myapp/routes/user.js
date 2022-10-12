var express = require("express");
var router = express.Router();
require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailler = require("nodemailer");
let refreshTokens = [];
router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.send("no 1");
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.send("err");
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
      res.json({ accessToken: accessToken });
    });
  } catch (err) {
    res.status(400).send("Invalid refresh token");
  }
});
const authentication = async (req, res, next) => {
  const token = await req.header("auth-token");
  if (!token) {
    res.send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.User = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

router.get("/users", authentication, function (req, res, next) {
  User.find().exec(function (err, user) {
    if (err) throw err;
    res.json(user);
  });
});

router.post("/addUser", async (req, res) => {
  console.log("user", req.body);
  const { email, password, name, phone } = req.body;
  console.log(name, "name");
  const check = await User.findOne({ email });
  if (check) {
    res.send("user already exist");
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("hlw", passwordHash);
    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
      phone,
    });
    const transporter = nodemailler.createTransport({
      host: "http://localhost",
      port: 8080,
      secure: false,
      service: "gmail",
      auth: {
        user: "souravmahanty12@gmail.com",
        pass: "dziaafwxgvxcdraj",
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log("err", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    const options = {
      from: "souravmahanty12@gmail.com",
      to: email,
      subject: "welcome to Mahanty Group",
      text: "You are successFully Registered in Mahanty Group of Industries Blog",
    };
    let info = await transporter.sendMail(options);
    console.log("info", info);
    res.json(newUser);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const check = await User.findOne({ email });
  if (check) {
    const checkpassword = await bcrypt.compare(password, check.password);
    if (checkpassword) {
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
      });
      const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("password doesn't match");
    }
  } else {
    res.send("user doesn't exist");
  }
});

router.delete("/deleteuser", (req, res) => {
  const { id } = req.body;
  User.findByIdAndDelete({ _id: id }, (err, user) => {
    if (err) throw err;
    res.send(user);
  });
});

router.put("/updateuser", (req, res) => {
  const { id, name } = req.body;
  User.findByIdAndUpdate({ _id: id }, { name: name }, (err, user) => {
    if (err) throw err;
    res.send(user);
  });
});

router.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;
  console.log("email,", email);
  const user = await User.findOne({ email });
  const id = user._id;
  console.log("user", user, user._id);
  const transporter = nodemailler.createTransport({
    host: "http://localhost",
    port: 8080,
    secure: false,
    service: "gmail",
    auth: {
      user: "souravmahanty12@gmail.com",
      pass: "dziaafwxgvxcdraj",
    },
  });
  const url = `http://localhost:8080/reset-password/${id}`;
  transporter.verify(function (error, success) {
    if (error) {
      console.log("err", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const options = {
    from: "souravmahanty12@gmail.com",
    to: email,
    subject: "reset password link",
    html: `<p>You requested for reset password, kindly use this <a href=${url}>link</a> to reset your password</p>`,
  };
  let info = await transporter.sendMail(options);
  res.json(info);
});
router.put("/reset-password/:id", async (req, res) => {
  const password = req.body;
  const id = req.params.id;
  console.log("password", password, id);
  User.findByIdAndUpdate({ _id: id }, password, (err, user) => {
    if (err) throw err;
    res.send(user);
  });
});

module.exports = router;
