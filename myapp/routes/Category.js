var express = require("express");
var router = express.Router();
const Category = require("../models/Categories");
const Url = require("../models/Url");
/* GET home page. */
// router.get("/categories", (req, res) => {
// Category.aggregate();

//   Category.find()
//     .then(async (result) => {
//       const allData = await Promise.all(
//         result.map(async (element) => {
//           return await Url.find({ CategoryId: element._id });
//         })
//       );
//       res.json({ result, allData });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });

router.get("/categories", (req, res) => {
  Category.aggregate([
    {
      $lookup: {
        from: "urls",
        localField: "_id",
        foreignField: "CategoryId",
        as: "AllUrls",
      },
    },
  ])
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/addCategory", (req, res) => {
  console.log("category", req.body);
  const { name } = req.body;
  Category.findOne({ name: name }, async (err, category) => {
    if (category) {
      res.send("category already exist");
    } else {
      const newCategory = await Category.create({
        name,
      });
      res.json(newCategory);
    }
  });
});

router.delete("/deleteCategory/:id", (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  Category.findByIdAndDelete({ _id: id }, (err, category) => {
    if (err) throw err;
    res.send(category);
  });
});

router.put("/updatecategory/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body;
  console.log("name", name, id);
  Category.findByIdAndUpdate({ _id: id }, name, (err, category) => {
    if (err) throw err;
    res.send(category);
  });
});

module.exports = router;
