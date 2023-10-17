const express = require("express");
const products = require("../controllers/products.controller");
const route = express.Router();

route.get("/getAllProduct", products.getAll);
// route.get("/search", products.getProductFilter);
route.get("/get-products", products.getProducts);
route.get("/get-top-products", products.getTopProducts);
route.get("/category", products.getCategoriesProduct);
route.get("/:_id", products.getProductById);

module.exports = route;
