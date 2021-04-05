const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");

const { signUp, signIn, signOut } = require("../controllers/user.js");
const { userSignUpValidator, validateUser } = require("../validators/index");

router.post("/signup", validateUser(), userSignUpValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.get("/hello", (req, res) => {
  return res.send("He");
});

module.exports = router;
