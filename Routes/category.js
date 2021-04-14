const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category.js");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth.js");

const { userById } = require("../controllers/user");

router.post("/category/create/:userid", requireSignIn, isAuth, isAdmin, create);

router.param("userid", userById);

module.exports = router;
