const express = require("express");
// Bringing in the express framework
const router = express.Router();
//Used for setting subpaths
const Meal = require("../models/meal");
// Bringing in the model
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// SHOW PAGE FOR THE FEED
router.get("/", (req, res) => {
  Meal.find({}, (err, items) => {
    res.render("index", { 
      items: items, 
      // Finds all the "meal's" that fit the model and places them on the index page
    /*username: req.session.username */});
  });
});

// SHOW PAGE FOR CREATING A NEW ITEM
router.get('/meal/new', (req, res) => {
  res.render('new');
});


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
router.post("/meal/new",  upload.single('image'), (req, res,) => {
 
  Meal.create({
    dish: req.body.dish,
    ingredients: req.body.ingredients,
    recepie: req.body.recepie,
    image: {
      data: req.file.buffer,
      // This is the actual data
      contentType: req.file.mimetype
      // This says what kind of file it is
    },
  }, (err, createditem) => {
    res.redirect("/");
  });
});

// SEND DATA TO DELETE AN ENTRY BY THE ID
router.delete("/meal/:id", (req, res) => {
  Meal.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect("/");
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
});

//THE ROUTER.GET FOR EDIT 
router.get("/meal/:id/edit", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.render("update", { item: item });
  });
});


router.get("/meal/:id/image", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.send(item.image.data);
  });
});


module.exports = router;
