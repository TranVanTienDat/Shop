const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDB",
    required: true,
  },
  cart: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productType: {
        type: String,
        required: true,
      },
      productValue: {
        type: String,
        required: true,
      },
      productQuantity: {
        type: Number,
        required: true,
      },
      productCheck: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
