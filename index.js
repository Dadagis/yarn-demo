require("dotenv").config();
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
