const User = require("../controller/user.controller");
const express = require("express");
const auth = require("../common/authentication");
const router = express.Router();


router.post("/userCreate", User.registerUser);
router.post("/loginUser", User.loginUser);
router.post("/updateUserById/:id",auth, User.updateUserDetailsById);
router.get("/getAllUser", auth, User.getAllUser);
router.get("/getUserById/:id", auth, User.getUserById);
router.post("/deleteUserById/:id",auth, User.deleteUserById);

module.exports = router;

