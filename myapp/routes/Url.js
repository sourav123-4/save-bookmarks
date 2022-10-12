var express = require("express");
const app = require("../app");
var router = express.Router();
const Url = require("../models/Url");

router.get("/urls", function (req, res, next) {
  const { id } = req.body;
  Url.findById({ _id: id })
    .populate("CategoryId")
    .exec(function (err, story) {
      if (err) throw err;
      res.json(story);
    });
});
router.post("/addUrl", (req, res) => {
  console.log("url", req.body);
  const { name, CategoryId } = req.body;
  Url.findOne({ name: name }, async (err, url) => {
    if (url) {
      res.send("url already exist");
    } else {
      const newUrl = await Url.create({
        name,
        CategoryId,
      });
      res.json(newUrl);
    }
  });
});

router.delete("/deleteurl/:id", (req, res) => {
  const { id } = req.params;
  Url.findByIdAndDelete({ _id: id }, (err, url) => {
    if (err) throw err;
    res.send(url);
  });
});

router.put("/updateurl/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  console.log("id", id);
  Url.findByIdAndUpdate({ _id: id }, { name: name }, (err, url) => {
    if (err) throw err;
    res.send(url);
  });
});

module.exports = router;
