const validateObjectId = require('../middleware/validateObjectId');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  Genre,
  validate
} = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET
router.get("/", async (req, res) => {
  //   throw new Error("failed");
  const genres = await Genre.find().sort({
    name: 1
  });
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res, next) => {

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Course with given ID not found");
  res.send(genre);
});

//POST (Insert)
router.post("/", auth, async (req, res) => {
  const {
    error
  } = validate(req.body); // result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

//PUT (Update)
router.put("/:id", auth, async (req, res) => {
  //Validate
  //If invalid, return 400- Bad request
  const {
    error
  } = validate(req.body); // result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //Look up course and updat
  const genre = await Genre.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name
    }, {
      new: true
    }
  );

  // if course not found throw error
  if (!genre) return res.status(404).send("The Genre with given ID not found!");

  //Return the updated course
  res.send(genre);
});

//DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  // find genre and delete
  const genre = await Genre.findByIdAndRemove(req.params.id);

  //If not exist, return 404
  if (!genre) {
    return res.status(404).send("Course with given ID not found");
  }
  // return
  res.send(genre);
});

module.exports = router;