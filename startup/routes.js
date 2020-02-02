const express = require("express");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const customers = require("../routes/customers");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const error = require("../middleware/error");

module.exports = function (app) {
    //add routes
    app.use(express.json());
    app.use("/", home);
    app.use("/api/genres", genres);
    app.use("/api/movies", movies);
    app.use("/api/customers", customers);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/returns", returns);

    //error middleware
    app.use(error);
};