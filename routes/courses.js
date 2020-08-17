const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Course, validateCourse } = require("../models/course");
const express = require("express");
const router = express.Router();

// OLD "schema"
// const courses = [
//   { id: 1, name: "course 1" },
//   { id: 2, name: "course 2" },
//   { id: 3, name: "course 3" },
// ];

router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find().sort("name");
    res.send(courses);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404).send("The course with the given ID was not found !");
  } else {
    res.send(course);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }

  const course = new Course({
    name: req.body.name,
  });

  try {
    const result = await course.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  const { error } = validateCourse(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }
  course.name = req.body.name;
  const result = await course.save();
  res.send(result);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  // const index = courses.indexOf(course);
  // courses.splice(index, 1);

  res.send(course);
});

module.exports = router;
