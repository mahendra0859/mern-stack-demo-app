const ResponseHelper = require("./response.helper"),
  UserModel = require("../models/user.model");

exports.RegistrationValidator = async (req, res, next) => {
  req.check("name", "Name is required").isLength({ min: 1 });
  req.check("email", "Enter a valid email").isEmail();
  req.check("password", "Password is required").isLength({ min: 5 });
  const errors = req.validationErrors();
  if (errors) return ResponseHelper(res, errors[0].msg, 422);
  const { email } = req.body;
  const userExist = await UserModel.findOne({ email });
  console.log("userExist", userExist);
  if (userExist) return ResponseHelper(res, "User alreday exist", 422);
  next();
};
exports.LoginValidator = (req, res, next) => {
  req.check("email", "Enter a valid email").isEmail();
  req.check("password", "Password is required").isLength({ min: 5 });
  const errors = req.validationErrors();
  if (errors) return ResponseHelper(res, errors[0].msg, 422);
  next();
};
