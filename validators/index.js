const { json } = require("body-parser");
const { body, validationResult, check } = require("express-validator");

const validateUser = () => {
  return [
    check("name", "Name is Required").notEmpty(),
    check("email", "E-mail must be between 3 t 32 characters")
      .matches(/.+@.+\..+/)
      .withMessage("Invalid e-mail")
      .isLength({
        min: 4,
        max: 32,
      }),
    check("password", "Password is required").notEmpty(),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ];
};

const userSignUpValidator = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    console.log(errors);
    next();
  } else {
    return res.status(422).json({
      errors: errors.errors,
    });
  }
};

module.exports = {
  validateUser,
  userSignUpValidator,
};
