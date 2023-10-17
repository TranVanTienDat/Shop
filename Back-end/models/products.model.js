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
  reviews: [
    {
      id_User: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      imgProduct: [String],
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  images: [String],
  selectProduct: {
    lisProduct: [
      {
        color: {
          type: String,
          required: true,
        },
        img: {
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
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
