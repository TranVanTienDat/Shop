const express = require("express");
const cart = require("../controllers/cart.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const route = express.Router();

route.post("/add-cart", tokenMiddleware.auth, cart.addCart);
route.get("/get-cart", tokenMiddleware.auth, cart.getCartsOfUser);
route.delete("/remote-item/:id", tokenMiddleware.auth, cart.removeCart);

module.exports = route;
