const mongoose = require("mongoose");
const Joi = require("joi");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Course = mongoose.model("Lesson", lessonSchema);

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

exports.Course = Course;
exports.validateCourse = validateCourse;
