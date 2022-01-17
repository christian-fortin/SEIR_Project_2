const express = require("express");
const router = express.Router();
const Chunks = require("../models/chunks");

// The home route
router.get("/chunks", (req, res) => {
  Chunks.find({}, (err, items) => {
    res.render("index", { 
      items: items, 
    /*username: req.session.username */});
  });
});

router.get('/chunks/new', (req, res) => {
  res.render('new');
});

router.get("/chunks/:id", (req, res) => {
  Chunks.findById(req.params.id, (err, item) => {
    res.render("show", { item: item });
  });
});

router.post("/chunks/new", (req, res) => {
  Chunks.create(req.body, (err, createditem) => {
    res.redirect("/chunks");
  });
});

router.delete("/chunks/:id", (req, res) => {
  Chunks.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect("/chunks");
  });
});

router.put("/chunks/:id", (req, res) => {
  Chunks.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      console.log(updatedModel);
      res.render("show", { item: updatedModel });
    }
  );
});

router.get("/chunks/:id/edit", (req, res) => {
  Chunks.findById(req.params.id, (err, item) => {
    res.render("update", { item });
  });
});



module.exports = router;
