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
        error: "Image could not be uploaded !!!",
      });
    }

    const { name, description, price, category, quantity, shipping } = feild;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All feilds are required !!!",
      });
    }

    const product = new Product(feild);
    if (files.photo) {
      console.log("Files Photo: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be of size less than 1mb.",
        });
      }
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
