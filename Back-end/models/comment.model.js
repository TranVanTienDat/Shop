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
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDB",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      images: [String],
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

const commentDB = mongoose.model("commentSchema", commentSchema);

module.exports = commentDB;
