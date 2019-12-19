const {
    Customer,
    validate
} = require('../models/customer');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();




// const genres = [
//     {id: 1,name: "Action"},
//     { id: 2,  name: "Horror"},
//     { id: 3, name: "Comedy"}
// ];

//GET
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort({
        name: 1
    });
    res.send(customers);
});

router.get("/:id", async (req, res) => {

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        res.status(404).send("Course with given ID not found");
    } else {
        res.send(customer);
    }
});

//POST (Insert)
router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});


//PUT (Update)
router.put("/:id", async (req, res) => {
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
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });

    // if course not found throw error
    if (!customer) return res.status(404).send('The Customer with given ID not found!');

    //Return the updated course
    res.send(customer);
});

//DELETE
router.delete("/:id", async (req, res) => {

    // find genre and delete
    const customer = await Customer.findByIdAndRemove(req.params.id);

    //If not exist, return 404
    if (!customer) {
        return res.status(404).send("Customer with given ID not found");
    }
    // return
    res.send(customer);
});

module.exports = router;