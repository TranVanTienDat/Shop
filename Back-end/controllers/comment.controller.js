const commentDB = require("../models/comment.model");
const productDB = require("../models/products.model");
const userDB = require("../models/auth.model");
const getDate = require("../utils/date");
exports.addComment = async (req, res) => {
  try {
    const { productID, rating, comment } = req.body;
    const images = req.files;
    const user = req.user;
    const currentAndNextDate = await getDate.getCurrentAndNextDate(new Date());
    const { currentDateFormatted } = currentAndNextDate;
    const newComment = {
      user: {
        userID: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      rating: rating,
      date: currentDateFormatted,
      images: [],
      comment: comment,
    };

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const imageInfo = {
        name: image.originalname,
        contentType: image.mimetype,
        data: image.path,
      };

      newComment.images.push(imageInfo);
    }
    const data = await commentDB.findOne({ productID: productID });
    if (data) {
      data.data.unshift(newComment);
      data.save();
      return res.status(200).json({ message: "thành công" });
    } else {
      const newData = new commentDB({
        productID: productID,
        data: [newComment],
      });
      newData.save();
      return res.status(200).json({ message: "thành công" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCommentsByProductID = async (req, res) => {
  try {
    const { productID } = req.params;

    const comments = await commentDB.find({ productID: productID });

    if (comments.length === 0) {
      return res.status(200).json([{ data: [] }]);
    }

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
