const express = require("express");
const router = express.Router();
const Meal = require("../models/meal");

// The home route
router.get("/meal", (req, res) => {
  Meal.find({}, (err, items) => {
    res.render("index", { 
      items: items, 
    /*username: req.session.username */});
  });
});

router.get('/meal/new', (req, res) => {
  res.render('new');
});

router.get("/meal/:id", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.render("show", { item: item });
  });
});

router.post("/meal/new", (req, res) => {
  Meal.create(req.body, (err, createditem) => {
    res.redirect("/meal");
  });
});

router.delete("/meal/:id", (req, res) => {
  Meal.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect("/meal");
  });
});

router.put("/meal/:id", (req, res) => {
  Meal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      console.log(updatedModel);
      res.render("show", { item: updatedModel });
    }
  );
});

router.get("/meal/:id/edit", (req, res) => {
  Meal.findById(req.params.id, (err, item) => {
    res.render("update", { item });
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

module.exports = router;
