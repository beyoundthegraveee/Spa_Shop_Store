const express = require("express");
const userController = require('../controllers/userController.js');
const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
module.exports = userRouter;