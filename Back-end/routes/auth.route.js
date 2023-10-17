const express = require("express");
const auth = require("../controllers/auth.controller");
const cart = require("../controllers/cart.controller");
const product = require("../controllers/products.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const route = express.Router();
route.post("/user/register", auth.create);
route.post("/user/login", auth.login);
route.get("/user/getAuth", tokenMiddleware.auth, auth.getUserData);
route.post("/addCart", tokenMiddleware.auth, cart.addCart);
route.get("/get-carts", tokenMiddleware.auth, cart.getCartsOfUser);
route.post("/buy", tokenMiddleware.auth, product.orderProducts);
route.get(
  "/get-order-products",
  tokenMiddleware.auth,
  product.getOrderProducts
);
route.put("/cancel-order", tokenMiddleware.auth, product.orderCancel);
route.delete("/remote/cart/:id", tokenMiddleware.auth, cart.removeCart);
route.put("/user/:id", auth.update);
route.put("/user/password/:id", auth.updatePassword);
route.post("/user/forgot-password", auth.forgotPassword);
route.delete("/user/deleteUser/:id", auth.deleteUser);
module.exports = route;
