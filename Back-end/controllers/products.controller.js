const userDB = require("../models/auth.model");
const productDB = require("../models/products.model");
const statusOrderDB = require("../models/statusOrder.model");
const getDate = require("../utils/date");

exports.getAllProduct = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 0;
    const itemsPerPage = parseInt(limit) || 20;
    const skip = pageNumber * itemsPerPage;

    const products = await productDB.find().limit(itemsPerPage).skip(skip);

    const totalCount = await productDB.countDocuments();
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    res.status(200).send({
      products,
      totalPages,
      currentPage: pageNumber,
      itemsPerPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFilterProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice, rating, page, limit } = req.query;
    const pageNumber = parseInt(page) || 0;
    const itemsPerPage = parseInt(limit) || 20;
    const skip = pageNumber * itemsPerPage;

    const filter = {};

    if (keyword !== "") {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (parseInt(minPrice) > 0 && parseInt(maxPrice) > 0) {
      filter.$and = [
        {
          "selectProduct.newPrice": {
            $gte: parseInt(minPrice),
            $lte: parseInt(maxPrice),
          },
        },
      ];
    } else if (parseInt(minPrice) > 0) {
      filter["selectProduct.newPrice"] = {
        $gte: parseInt(minPrice),
      };
    } else if (parseInt(maxPrice) > 0) {
      filter["selectProduct.newPrice"] = {
        $lte: parseInt(maxPrice),
      };
    }

    if (parseInt(rating) > 0) {
      filter.rating = { $gte: parseInt(rating) };
    }

    const products = await productDB
      .find(filter)
      .limit(itemsPerPage)
      .skip(skip);

    const totalCount = await productDB.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    res.status(200).send({
      products,
      totalPages,
      currentPage: pageNumber,
      itemsPerPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await productDB
      .find({}, { _id: 1, name: 1, categories: 1, images: 1, selectProduct: 1 })
      .sort({ rating: -1 })
      .limit(4);
    if (!topProducts) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(topProducts);
  } catch (error) {}
};

exports.getBestseller = async (req, res) => {
  try {
    const bestsellerProduct = await productDB
      .find({}, { _id: 1, name: 1, categories: 1, images: 1, selectProduct: 1 })
      .sort({ sold: -1 })
      .limit(7);
    if (!bestsellerProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(bestsellerProduct);
  } catch (error) {}
};

exports.getCategoriesProduct = async (req, res) => {
  try {
    const { category, page } = req.query;
    const itemsPerPage = parseInt(page);
    const skip = 12 * itemsPerPage;
    const topProducts = await productDB
      .find(
        { categories: { $elemMatch: { $regex: category, $options: "i" } } },
        { _id: 1, name: 1, categories: 1, images: 1 }
      )
      .limit(12)
      .skip(skip);
    if (!topProducts) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(topProducts);
  } catch (error) {}
};

// get one product
exports.getProductById = async (req, res) => {
  try {
    const _id = req.params._id;
    const product = await productDB.findById(_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Product related
exports.getRelatedProducts = async (req, res) => {
  try {
    const { category, _id } = req.query;
    const searchArray = category.split(",");
    const relatedItems = await productDB
      .find(
        {
          _id: { $ne: _id },
          categories: {
            $elemMatch: { $regex: searchArray.join("|"), $options: "i" },
          },
        },
        { _id: 1, name: 1, selectProduct: 1, images: 1 }
      )
      .limit(4);

    return res.status(200).json(relatedItems);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.orderProducts = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ message: "not found" });
    }
    const user = await userDB.findOne({ _id: req.user });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { name, address, phoneNumber } = user;
    const currentAndNextDate = await getDate.getCurrentAndNextDate(new Date());
    const { currentDateFormatted, nextDateFormatted } = currentAndNextDate;

    const data = {
      store: body.store,
      status: { typeStatus: 1, typeText: "chờ XN" },
      totalPay: body.totalPay,
      transferTime: currentDateFormatted,
      receivingTime: nextDateFormatted,
      address: `${name}(${phoneNumber}) ${address}`,
    };

    const statusOrder = await statusOrderDB.findOne({ user: req.user });
    if (statusOrder) {
      statusOrder.data.unshift(data);
      await statusOrder.save();
      return res.status(200).json({ message: "Đặt hàng thành công" });
    } else {
      const newStatusOrder = new statusOrderDB({
        user: req.user,
        data: [data],
      });
      await newStatusOrder.save();
      return res.status(200).json({ message: "Đặt hàng thành công" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderProducts = async (req, res) => {
  try {
    const { typeStatus } = req.query;
    const data = await statusOrderDB.findOne({ user: req.user });

    if (!data) {
      return res.status(200).json([]);
    }
    let result = [];
    if (typeStatus === "0") {
      result = data.data;
    } else {
      result = data.data.filter(
        (item) => item.status.typeStatus === parseInt(typeStatus)
      );
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.orderCancel = async (req, res) => {
  try {
    const { _id, typeStatus } = req.body;

    const orderExists = await statusOrderDB.findOne({ "data._id": _id });
    if (!orderExists) {
      return res.status(404).json("Không tìm thấy đơn hàng");
    }

    const updatedOrder = await statusOrderDB.findOneAndUpdate(
      { "data._id": _id },
      {
        $set: {
          "data.$[inner].status.typeStatus": parseInt(typeStatus),
          "data.$[inner].status.typeText": "đã hủy hàng",
        },
      },
      {
        arrayFilters: [{ "inner._id": _id }],
        new: true,
      }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy đơn hàng để cập nhật" });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
