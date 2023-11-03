const express = require("express");

const comment = require("../controllers/comment.controller");
const upload = require("../middlewares/upload.middleware");
const tokenMiddleware = require("../middlewares/token.middleware");
const route = express.Router();

route.post(
  "/add-comment",
  tokenMiddleware.auth,
  upload.array("images", 5),
  comment.addComment
);

route.get(
  "/get-comment/:productID",
  tokenMiddleware.auth,
  comment.getAllCommentsByProductID
);

module.exports = route;
