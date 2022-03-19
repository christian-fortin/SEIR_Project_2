const express = require("express");
const router = express.Router();
const Meal = require("../models/meal");
const multer = require("multer");

// MULTER FOR IMAGE UPLOAD
let Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: Storage,
}).single("image"); //Field name and max count


// SHOW PAGE FOR THE FEED
router.get("/meal", (req, res) => {
  Meal.find({}, (err, items) => {
    res.render("index", { 
      items: items, 
    /*username: req.session.username */});
  });
});

// SHOW PAGE FOR CREATING A NEW ITEM
router.get('/meal/new', (req, res) => {
  res.render('new');
});
// WHERE IS THE ROUTER>GET FOR EDIT 
//SHOW PAGE SINGULAR
router.get("/meal/:id", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.render("show", { item: item });
  });
});

// router.get("/meal/:id/edit", (req, res) => {
//   Meal.findById(req.params.id, (err, item) => {
//     res.render("show", { item: item });
//   });
// });

// SEND DATA TO CREATE THE NEW ITEM FROM THE FORM DATA
router.post("/meal/new", (req, res) => {
  Meal.create(req.body, (err, createditem) => {
    res.redirect("/meal");
  });
});

// SEND DATA TO DELETE AN ENTRY BY THE ID
router.delete("/meal/:id", (req, res) => {
  Meal.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect("/meal");
  });
});

// SEND DATA TO UPDATE THE ID
router.put("/meal/:id", (req, res) => {
  Meal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      console.log('',updatedModel);
      res.render("show", { item: updatedModel });
    }
  );
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong");
    } else {
      console.log('filepath name',req.file.path);
      let imageName = req.file.filename;
            res.render('home',{success : true})
    }
  });
});

router.get("/meal/:id/edit", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.render("update", { item: item });
  });
});

// router.put("/chunks/:id/buy", (req, res) => {
//   Chunks.findById(req.params.id, (err, item) => {
//     if (item.qty > 0) {
//       item.qty--;
//       Chunks.findByIdAndUpdate(
//         req.params.id,
//         item,
//         { new: true },
//         (err, updatedModel) => {
//           console.log(updatedModel);
//           res.render("show", { item: updatedModel });
//         }
//       );
//     } else {
//         res.render('show', { item: item })
//     }
//   });

// });


router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong");
    } else {
      console.log('filepath name',req.file.path);
      let imageName = req.file.filename;
            res.render('home',{success : true})
    }
  });
});

module.exports = router;
