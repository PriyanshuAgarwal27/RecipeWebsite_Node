const express = require("express");
const userRouter = express.Router();
const {
  userLoginInfo,
  userSignUp,
} = require("../controllers/handleUserRequest");

userRouter.post("/login", userLoginInfo);
userRouter.post("/signup", userSignUp);

module.exports = { userRouter };
