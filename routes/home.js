const express = require("express");
const { route } = require("./courses");
const router = express.Router();

router.get("", (req, res) => {
  res.render("index", { title: "My express app", message: "Hello" });
});

module.exports = router;
