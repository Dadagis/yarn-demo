const { Customer, validateCustomer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("The customer with the given ID was not found !");
  } else {
    res.send(customer);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
  });

  try {
    const result = await customer.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  const { error } = validateCustomer(req.body);

  if (error) {
    res
      .status(400)
      .send(
        `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
      );
    return;
  }
  customer.isGold = req.body.isGold || customer.isGold;
  customer.name = req.body.name;
  customer.phone = req.body.phone;
  const result = await customer.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  // const course = courses.find((c) => c.id === parseInt(req.params.id));
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  // const index = courses.indexOf(course);
  // courses.splice(index, 1);

  res.send(customer);
});

module.exports = router;
