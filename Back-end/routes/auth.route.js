const express = require("express");
const auth = require("../controllers/auth.controller");
const tokenMiddleware = require("../middlewares/token.middleware");
const route = express.Router();

route.post("/sign-up", auth.create);
route.post("/sign-in", auth.login);
route.get("/get-user", tokenMiddleware.auth, auth.getUserData);
route.put("/update-user", tokenMiddleware.auth, auth.updateUser);
route.put("/update-password", tokenMiddleware.auth, auth.updatePassword);
route.post("/forgot-password", auth.forgotPassword);
route.delete("/remote-user", tokenMiddleware.auth, auth.deleteUser);
module.exports = route;
