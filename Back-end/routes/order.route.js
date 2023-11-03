const express = require("express");

const tokenMiddleware = require("../middlewares/token.middleware");

const product = require("../controllers/products.controller");
const route = express.Router();

route.post("/buy", tokenMiddleware.auth, product.orderProducts);
route.get(
  "/get-order-products",
  tokenMiddleware.auth,
  product.getOrderProducts
);
route.put("/cancel-order", tokenMiddleware.auth, product.orderCancel);

module.exports = route;
