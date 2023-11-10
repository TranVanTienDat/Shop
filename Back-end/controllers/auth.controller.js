const userDB = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// exports.create = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({ message: "not found" });
//     return;
//   }
//   const {
//     name,
//     email,
//     password,
//     avatar,
//     gender = "",
//     address = "",
//     dateBirth = "",
//     phoneNumber = "",
//   } = req.body;
//   const user = userDB.findOne({ email }).then((foundUser) => {
//     if (foundUser) {
//       return res.status(409).send({ message: "Email already exists" });
//     }

//     const saltRounds = 10;
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send({ message: "error" });
//       }
//       bcrypt.hash(password, salt, (err, hashedPassword) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).send({ message: "error" });
//         }
//         const user = new userDB({
//           name,
//           email,
//           password: hashedPassword,
//           avatar,
//           gender,
//           address,
//           dateBirth,
//           phoneNumber,
//         });
//         user
//           .save()
//           .then((data) => {
//             res.status(200).json(data);
//           })
//           .catch((err) => res.status(500).send({ message: "error" }));
//       });
//     });
//   });
// };
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "not found" });
    return;
  }
  const {
    name,
    email,
    password,
    avatar,
    gender = "",
    address = "",
    dateBirth = "",
    phoneNumber = "",
  } = req.body;
  try {
    const foundUser = await userDB.findOne({ email });
    if (foundUser) {
      return res.status(409).send({ message: "Email already exists" });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "error" });
      }
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new userDB({
        name,
        email,
        password: hashedPassword,
        avatar,
        gender,
        address,
        dateBirth,
        phoneNumber,
      });
      const data = await user.save();
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

// exports.login = (req, res) => {
//   userDB
//     .findOne({ email: req.body.email })
//     .then((foundUser) => {
//       if (!foundUser) {
//         return res.status(404).send({ message: "Email not registered." });
//       }

//       bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
//         if (err) {
//           return res.status(500).send({ message: "Internal server error" });
//         }
//         if (!match) {
//           return res.status(401).send({ message: "Incorrect password" });
//         }

//         const token = jwt.sign(
//           { id: foundUser._id },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: "24h" }
//         );
//         res
//           .status(200)
//           .send({
//             user: foundUser._doc,
//             auth: true,
//             token: token,
//             message: "Success",
//           });
//       });
//     })
//     .catch((error) => {
//       res.status(500).send({ message: "Internal server error" });
//     });
// };
exports.login = async (req, res) => {
  try {
    const foundUser = await userDB.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(404).json({ message: "Email not registered." });
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      user: foundUser._doc,
      auth: true,
      token: token,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.updateUser = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({ message: "error" });
//   }

//   userDB
//     .findByIdAndUpdate(req.user.id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({ message: `update isn't success for ${id}` });
//       } else {
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({ message: "error update" });
//     });
// };
exports.updateUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "error" });
    return;
  }

  try {
    const data = await userDB.findByIdAndUpdate(req.user.id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({ message: `update isn't success for ${id}` });
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error update" });
  }
};

// exports.getUserData = (req, res) => {
//   userDB
//     .findById(req.user.id)
//     .then((foundUser) => {
//       if (!foundUser)
//         return res.status(404).send({ message: "Resource not found" });

//       res.status(200).send({ user: foundUser });
//     })
//     .catch((error) => {
//       res.status(500).send({ message: "Internal server error" });
//     });
// };
exports.getUserData = async (req, res) => {
  try {
    const foundUser = await userDB.findById(req.user.id);
    if (!foundUser) {
      return res.status(404).send({ message: "Resource not found" });
    }
    res.status(200).send({ user: foundUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// exports.updatePassword = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({ message: "error" });
//   }
//   const newPassword = req.body.newPassword;
//   const currentPassword = req.body.currentPassword;

//   userDB
//     .findById(req.user.id)
//     .then((foundUser) => {
//       if (!foundUser) {
//         return res
//           .status(404)
//           .send({ message: `User not found with id ${id}` });
//       }

//       bcrypt.compare(currentPassword, foundUser.password, (err, match) => {
//         if (err) {
//           res.status(500).send({ message: "Internal server error" });
//         } else if (!match) {
//           res.status(401).send({ message: "Incorrect current password" });
//         } else {
//           const saltRounds = 10;
//           bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
//             if (err) {
//               res.status(500).send({ message: "Error" });
//             } else {
//               userDB
//                 .findByIdAndUpdate(
//                   id,
//                   { password: hashedPassword },
//                   { useFindAndModify: false }
//                 )
//                 .then((data) => {
//                   if (!data) {
//                     res
//                       .status(404)
//                       .send({ message: `Update unsuccessful for user ${id}` });
//                   } else {
//                     res.send({ message: "Password updated successfully." });
//                   }
//                 })
//                 .catch((err) => {
//                   res.status(500).send({ message: "Error updating password" });
//                 });
//             }
//           });
//         }
//       });
//     })
//     .catch((error) => {
//       res.status(500).send({ message: "Internal server error" });
//     });
// };
exports.updatePassword = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "error" });
    }

    const { newPassword, currentPassword } = req.body;
    const foundUser = await userDB.findById(req.user.id);

    if (!foundUser) {
      return res.status(404).send({ message: `User not found with id ${id}` });
    }

    const match = await bcrypt.compare(currentPassword, foundUser.password);

    if (!match) {
      return res.status(401).send({ message: "Incorrect current password" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await userDB.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { useFindAndModify: false }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: `Update unsuccessful for user ${id}` });
    }

    res.send({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error updating password" });
  }
};

// exports.forgotPassword = (req, res) => {
//   const email = req.body.email;

//   userDB.findOne({ email }).then((foundUser) => {
//     if (!foundUser) {
//       return res.status(404).send({ message: "Email not registered." });
//     }

//     const newPassword = Math.random().toString(36).substring(2, 8);

//     const saltRounds = 10;
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         return res.status(500).send({ message: "Internal server error" });
//       }
//       bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
//         if (err) {
//           return res.status(500).send({ message: "Internal server error" });
//         }
//         userDB
//           .findByIdAndUpdate(
//             foundUser._id,
//             { password: hashedPassword },
//             { useFindAndModify: false }
//           )
//           .then(() => {
//             res.status(200).send({
//               message: `Your new password is: ${newPassword}`,
//             });
//           })
//           .catch((error) => {
//             res.status(500).send({ message: "Internal server error" });
//           });
//       });
//     });
//   });
// };
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const foundUser = await userDB.findOne({ email });

    if (!foundUser) {
      return res.status(404).send({ message: "Email not registered." });
    }

    const newPassword = Math.random().toString(36).substring(2, 8);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userDB.findByIdAndUpdate(
      foundUser._id,
      { password: hashedPassword },
      { useFindAndModify: false }
    );

    res.status(200).send({
      message: `Your new password is: ${newPassword}`,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// exports.deleteUser = (req, res) => {
//   userDB
//     .findByIdAndDelete(req.user.id)
//     .then((data) => {
//       if (!data) {
//         res.status(400).send({ message: "Error can not be deleted" });
//       } else {
//         res.send({ message: "Delete successfully." });
//       }
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// };
exports.deleteUser = async (req, res) => {
  try {
    const data = await userDB.findByIdAndDelete(req.user.id);
    if (!data) {
      res.status(400).send({ message: "Error can not be deleted" });
    } else {
      res.send({ message: "Delete successfully." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
