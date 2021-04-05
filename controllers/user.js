const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signUp = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    return res.json({
      user,
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(422).json({
        err: "User with that email does not exist. PLEASE SIGNUP!!!!!",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Email and Password does not exist",
      });
    }

    // Generating the User
    console.log(user._id);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "User is signed out." });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});
