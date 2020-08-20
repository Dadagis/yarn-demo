const express = require("express");
const error = require("../middleware/error");
const home = require("../routes/home");
const courses = require("../routes/courses");
const customers = require("../routes/customers");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  // express
  app.use(express.json());
  // routes
  app.use("/", home);
  app.use("/api/courses", courses);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
