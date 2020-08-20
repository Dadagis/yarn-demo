const mongoose = require("mongoose");

module.exports = function () {
  // mongoDb connect
  mongoose
    .connect(`${process.env.URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDb"));
};
