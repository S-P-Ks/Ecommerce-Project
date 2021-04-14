const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth.js");

const { userById } = require("../controllers/user");

router.post("/secret/:userid", requireSignIn, isAuth, isAdmin, (req, res) => {
  console.log(req.params.userid);
  return res.json({
    user: req.profile,
  });
});

router.param("userid", userById);

module.exports = router;
