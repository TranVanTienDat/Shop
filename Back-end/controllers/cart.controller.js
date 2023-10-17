const { json } = require("body-parser");
const Cart = require("../models/cart.model");

exports.addCart = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "not found" });
  }

  Cart.findOne({ user: req.user.id }).then((item) => {
    if (item) {
      item.cart.unshift({ ...req.body, productCheck: false });
      item
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => res.status(500).send({ message: err }));
    } else {
      const newCart = new Cart({
        user: req.user.id,
        cart: [{ ...req.body }],
      });

      newCart
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => res.status(500).send({ message: err }));
    }
  });
};

exports.getCartsOfUser = (req, res) => {
  Cart.findOne({ user: req.user.id })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
};

exports.removeCart = (req, res) => {
  const { id } = req.params;

  Cart.findOneAndUpdate(
    { user: req.user.id, "cart._id": id },
    { $pull: { cart: { _id: id } } }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "not found" });
      }
      return res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error }));
};
