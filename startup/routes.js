const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
    //add routes
    app.use(express.json());
    app.use("/", home);
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/users", users);
    app.use("/api/auth", auth);

    //error middleware
    app.use(error);
};