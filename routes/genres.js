const Joi = require("joi");
const express = require("express");
const router = express.Router();



const genres = [{
        id: 1,
        name: "Action"
    },
    {
        id: 2,
        name: "Horror"
    },
    {
        id: 3,
        name: "Comedy"
    }
];

//GET
router.get("/", (req, res) => {
    res.send(genres);
});

router.get("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("Course with given ID not found");
    } else {
        res.send(genre);
    }
});

//POST (Insert)
router.post("/", (req, res) => {
    const {
        error
    } = validateCourse(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

//PUT (Update)
router.put("/:id", (req, res) => {
    //Look up course
    //If not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("Course with given ID not found");
        return;
    }

    //Validate
    //If invalid, return 400- Bad request
    const {
        error
    } = validateCourse(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    genre.name = req.body.name;
    //Return the updated course
    res.send(genre);
});

//DELETE
router.delete("/:id", (req, res) => {
    //Look up course
    //If not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send("Course with given ID not found");
    }

    //Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1); // 1 is for removing 1 object from that index

    // return
    res.send(genre);
});


function validateCourse(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(genre, schema);
}


module.exports = router;