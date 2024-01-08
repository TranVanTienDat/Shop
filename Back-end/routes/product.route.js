const express = require("express");
const products = require("../controllers/products.controller");
const route = express.Router();

route.get("/daily_discover", products.getAllProduct);
route.get("/search", products.getFilterProducts);
route.get("/top", products.getTopProducts);
route.get("/best_seller", products.getBestseller);
route.get("/category", products.getCategoriesProduct);
route.get("/related", products.getRelatedProducts);
route.get("/:_id", products.getProductById);

module.exports = route;
