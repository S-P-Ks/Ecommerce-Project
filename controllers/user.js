const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  console.log(req.body);
  console.log("-->");
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(422).json({
        err: "User not present",
      });
    }
    console.log(user);
    req.profile = user;
    next();
  });
};
