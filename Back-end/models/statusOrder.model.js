const mongoose = require("mongoose");

const statusOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDB",
    required: true,
  },
  data: [
    {
      store: {
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
      },
      status: {
        typeStatus: {
          type: Number,
          required: true,
        },
        typeText: {
          type: String,
          required: true,
        },
      },
      totalPay: {
        type: Number,
        required: true,
      },
      transferTime: {
        type: String,
        required: true,
      },
      receivingTime: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  ],
});

const statusOrderDB = mongoose.model("statusOrderSchema", statusOrderSchema);

module.exports = statusOrderDB;
