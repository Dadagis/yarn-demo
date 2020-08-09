require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://David:Azertyuiop*13@vidly.xwsex.gcp.mongodb.net/Vidly?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const courses = require("./routes/courses");
const express = require("express");
const app = express();

mongoose.connect(`${process.env.URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());

// Configuration
console.log(`Configuration name ${config.get("name")}`);
console.log(`Mail server ${config.get("mail.host")}`);

app.use(logger);
app.use(helmet());
app.use("/", home);
app.use("/api/courses", courses);

if (app.get("env") === "development") {
  startupDebugger("Mogran enabled");
  app.use(morgan("tiny"));
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["Angular", "Frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: "Mosh" });
  console.log(courses);
}

getCourses();
