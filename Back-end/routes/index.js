const express = require("express");

const productRouter = require("./product.route");
const authRouter = require("./auth.route");
const router = express.Router();
router.use("/product", productRouter);
router.use("/auth", authRouter);
// router.use("/cart", cartRouter);

module.exports = router;
