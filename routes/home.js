const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Yellow world!");
});


module.exports = router;