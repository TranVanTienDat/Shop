const express = require("express");

const productRouter = require("./product.route");
const authRouter = require("./auth.route");
const commentRouter = require("./comment.route");
const cartRouter = require("./cart.route");
const orderRouter = require("./order.route");
const router = express.Router();
router.use("/product", productRouter);
router.use("/user", authRouter);
router.use("/rating", commentRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

module.exports = router;
