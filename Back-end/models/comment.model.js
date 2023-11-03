const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  data: [
    {
      user: {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userDB",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
      },
      rating: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      images: [
        {
          name: { type: String, required: true },
          data: { type: String, required: false },
          contentType: { type: String, required: true },
        },
      ],
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

const commentDB = mongoose.model("commentSchema", commentSchema);

module.exports = commentDB;
