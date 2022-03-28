const express = require("express");
// Bringing in the express framework
const router = express.Router();
//Used for setting subpaths
const Meal = require("../models/meal");
// Bringing in the model
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// MULTER FOR IMAGE UPLOAD
// let Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     console.log('THIS RAN 2.0')
//     callback(null, "./public/");
//     console.log('THIS RAN');
//   },
//   filename: function (req, file, callback) {
//     console.log('THIS RAN ALSO');
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// let upload = multer({
//   storage: Storage,
// }).single("image"); //Field name and max count


// SHOW PAGE FOR THE FEED
router.get("/meal", (req, res) => {
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


// FOR UPLOADING AN IMAGE
// router.post("/", (req, res) => {
 
//       var imageDetails = new imageModel({
//         image: {
//           data: req.file.buffer,
//           contentType: req.file.mimetype
//         },
//       });

//       imageDetails.save(function (err, doc) {
//         if (err) throw err;
//         console.log("Image Saved");
//         imageData.exec(function(err,data){
//             if(err) throw err;
//             res.render('home',{records:data,success:true})
//         })
//       });
//     }
//   });
// });

module.exports = router;
