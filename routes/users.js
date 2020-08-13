const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await user.save();
    res.send(_.pick(user, ["name", "email"]));
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
