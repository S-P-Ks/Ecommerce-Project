const Category = require("../models/category");
const errHandler = require("../handler/db_handler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errHandler(err),
      });
    }
    return res.json({
      data,
    });
  });
};
