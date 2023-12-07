const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  sold: {
    type: Number,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
  description: {
    parameter: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    selectSize: [
      {
        title: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  categories: [String],
  rating: {
    type: Number,
    required: true,
  },
  images: [String],
  selectProduct: [
    {
      color: {
        type: String,
        required: true,
      },
      newPrice: {
        type: Number,
        required: true,
      },
      oldPrice: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      sizes: [
        {
          size: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
