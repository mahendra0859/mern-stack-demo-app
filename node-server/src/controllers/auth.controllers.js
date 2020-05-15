const bcrypt = require("bcrypt"),
  UserModel = require("../models/user.model"),
  { ResponseHelper, JWTHelper } = require("../helpers");

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password });
    const token = JWTHelper.generateToken({ name, email, id: user.id });
    ResponseHelper(res, "Registered Succesfully", 201, true, {
      token: `Bearer ${token}`,
      user: { name, email },
    });
  } catch (err) {
    ResponseHelper(res, err.message);
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { email },
      { last_logged: new Date() }
    );
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const { name, email, id } = user;
        const token = JWTHelper.generateToken({ name, email, id });
        ResponseHelper(res, "Logged In Succesfully", 200, true, {
          token: `Bearer ${token}`,
          user: { name, email, id },
        });
      } else ResponseHelper(res, "Invalid Password", 401);
    } else
      ResponseHelper(
        res,
        "User with that email does not exist. Please signup.",
        404
      );
  } catch (err) {
    ResponseHelper(res, err.message);
  }
};
