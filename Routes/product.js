const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product.js");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth.js");

const { userById } = require("../controllers/user");

router.post("/product/create/:userid", requireSignIn, isAuth, isAdmin, create);

router.param("userid", userById);

module.exports = router;
