const jwt = require("jsonwebtoken");
const userDB = require("../models/auth.model");

const tokenDecode = (req) => {
  try {
    const authToken = req.headers.authorization;

    if (authToken) {
      const token = authToken.split(" ")[1];
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = (req, res, next) => {
  const authToken = tokenDecode(req);
  if (!authToken) return res.status(401).send({ message: "Unauthorized" });

  userDB.findById(authToken.id).then((user) => {
    if (!user) return res.status(401).send({ message: "Unauthorized" });
    req.user = user;
    next();
  });
};

module.exports = { tokenDecode, auth };
