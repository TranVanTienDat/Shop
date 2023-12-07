const Cart = require("../models/cart.model");

exports.addCart = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "not found" });
    }

    const item = await Cart.findOne({ user: req.user.id });

    if (item) {
      const existingProduct = item.cart.find(
        (product) =>
          product.productID.toString() === req.body.productID.toString()
      );

      if (existingProduct) {
        return res
          .status(200)
          .json({ add: false, message: "đã có sẵn trong giỏ hàng" });
      }

      item.cart.unshift({ ...req.body, productCheck: false });
      await item.save();

      return res
        .status(200)
        .json({ add: true, message: "Thêm vào giỏ hàng thành công" });
    } else {
      const newCart = new Cart({
        user: req.user.id,
        cart: [{ ...req.body }],
      });

      await newCart.save();

      return res
        .status(200)
        .json({ add: true, message: "Thêm vào giỏ hàng thành công" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.getCartsOfUser = async (req, res) => {
  try {
    const data = await Cart.findOne({ user: req.user.id });

    if (!data) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Cart.findOneAndUpdate(
      { user: req.user.id, "cart._id": id },
      { $pull: { cart: { _id: id } } }
    );

    if (!data) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
