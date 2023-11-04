const Cart = require("../models/cart.model");

// exports.addCart = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({ message: "not found" });
//   }
//   Cart.findOne({ user: req.user.id }).then((item) => {
//     if (item) {
//       const existingProduct = item.cart.find(
//         (product) =>
//           product.productID.toString() === req.body.productID.toString()
//       );

//       if (existingProduct) {
//         return res
//           .status(200)
//           .json({ add: false, message: "đã có sẵn trong giỏ hàng" });
//       }

//       item.cart.unshift({ ...req.body, productCheck: false });
//       item
//         .save()
//         .then((data) => {
//           res
//             .status(200)
//             .json({ add: true, message: "Thêm vào giỏ hàng thành công" });
//         })
//         .catch((err) => res.status(500).send({ message: err }));
//     } else {
//       const newCart = new Cart({
//         user: req.user.id,
//         cart: [{ ...req.body }],
//       });

//       newCart
//         .save()
//         .then((data) => {
//           res
//             .status(200)
//             .json({ add: true, message: "Thêm vào giỏ hàng thành công" });
//         })
//         .catch((err) => {
//           console.log(err);
//           // return res.status(500).send({ message: err });
//         });
//     }
//   });
// };
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

// exports.getCartsOfUser = (req, res) => {
//   Cart.findOne({ user: req.user.id })
//     .then((data) => {
//       return res.status(200).json(data);
//     })
//     .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
// };
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

// exports.removeCart = (req, res) => {
//   const { id } = req.params;

//   Cart.findOneAndUpdate(
//     { user: req.user.id, "cart._id": id },
//     { $pull: { cart: { _id: id } } }
//   )
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({ message: "not found" });
//       }
//       return res.status(200).json(data);
//     })
//     .catch((error) => res.status(500).json({ message: error }));
// };
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
