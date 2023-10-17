const commentDB = require("../models/comment.model");
const getDate = require("../utils/date");
const productDB = require("../models/products.model");

exports.addComment = (req, res) => {
    const {productID} =  req.body
    const data = commentDB.findOne({productID: productID})
    const user
    if(data) {

    }
};
