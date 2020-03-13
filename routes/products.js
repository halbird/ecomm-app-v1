// route handlers for products exposed to all users of application, not just admin

const express = require("express");

const productsRepo = require("../repositories/products");
const productsIndexTemplate = require("../views/products/index");
const productsDetailTemplate = require("../views/products/details");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({products}));
});

router.get("/details/:id", async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);
  res.send(productsDetailTemplate({product}));
});

module.exports = router;