// new express router with route handlers for cart
const express = require("express");
const cartsRepo = require("../repositories/carts");

const productsRepo = require("../repositories/products");
const cartTemplate = require("../views/carts/show");
const emptyCartTemplate = require("../views/carts/empty");

const router = express.Router();

router.post("/cart/products", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({items: []});
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({id: req.body.productId, quantity: 1});
  }
  await cartsRepo.update(cart.id, {items: cart.items});
  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.send(emptyCartTemplate());
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  if (!cart.items || cart.items.length === 0) {
    return res.send(emptyCartTemplate());
  }
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.send(cartTemplate({items: cart.items}));
});

router.post("/cart/products/delete", async (req, res) => {
  const {itemId} = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const matchingItem = cart.items.find(product => product.id === itemId);
  const items = cart.items.filter(item => item.id !== itemId);
  if (matchingItem.quantity > 1) {
    matchingItem.quantity -= 1;
    items.push(matchingItem);
  }
  await cartsRepo.update(req.session.cartId, {items});
  res.redirect("/cart");
});

module.exports = router;