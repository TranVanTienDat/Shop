const express = require("express");
const products = require("../controllers/products.controller");
const route = express.Router();

route.get("/products", products.getProducts);
route.get("/top", products.getTopProducts);
route.get("/category", products.getCategoriesProduct);
route.get("/:_id", products.getProductById);

module.exports = route;
