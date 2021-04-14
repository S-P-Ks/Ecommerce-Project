const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const errHandler = require("../handler/db_handler");
const { result } = require("lodash");

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const product = new Product(feild);
    if (files.photo) {
      product.photo.data = fs.fileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: errHandler(err),
        });
      }
      res.json(product);
    });
  });
};
