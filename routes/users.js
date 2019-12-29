const bcrypt = require('bcrypt');
const _ = require("lodash");
const {
    User,
    validate
} = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET
router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({
        email: req.body.email
    });

    if (user) {
        return res.status(400).send("User already registered.");
    }

    //   user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    //   });

    // use of LoDash
    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    //   res.send(user);

    res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;