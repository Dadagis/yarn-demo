require("dotenv").config();
const winston = require("winston");
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();

require("./startup/routes")(app);

// mongoDb connect
mongoose
  .connect(`${process.env.URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch(() => console.log("Could not connect to DataBase"));

// PUG
app.set("view engine", "pug");
app.set("views", "./views");

// Configuration
console.log(`Configuration name ${config.get("name")}`);
console.log(`Mail server ${config.get("mail.host")}`);

app.use(logger);
app.use(helmet());

if (app.get("env") === "development") {
  startupDebugger("Mogran enabled");
  app.use(morgan("tiny"));
}

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;

// DB Test
// const courseSchema = new mongoose.Schema({
//   name: { type: String, required: true, minlength: 5 },
//   author: String,
//   tags: {
//     type: Array,
//     validate: {
//       validator: function (v) {
//         return v && v.length > 0;
//       },
//       message: "A course should have at laeast one tag",
//     },
//   },
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
//   price: {
//     type: Number,
//     required: function () {
//       return this.isPublished;
//     },
//   },
// });

// const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: "Angular course",
//     author: "Mosh",
//     tags: ["Angular", "Frontend"],
//     isPublished: true,
//     price: 15,
//   });

//   try {
//     const result = await course.save();
//     console.log(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function getCourses() {
//   const courses = await Course.find({ author: "Mosh" });
//   console.log(courses);
// }

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPublished = true;
//   course.author = "Another author";

//   const result = await course.save();
//   console.log(result);
// }

// // Update directly in the database example :

// async function updateCourseExample(id) {
//   // or findByIdAndUpdate to get the updated object with the option {new: true}
//   const result = await Course.update(
//     { _id: id },
//     { $set: { author: "Mosh", isPublished: false } }
//   );

//   console.log(result);
// }

// async function removeDocument(id) {
//   // or deleteMany
//   const result = await Course.deleteOne({ _id: id });
//   console.log(result);
// }

// createCourse();
// getCourses();
// updateCourse("5f2ff09662baf9184026e802");
// removeDocument("5f2ff09662baf9184026e802");
