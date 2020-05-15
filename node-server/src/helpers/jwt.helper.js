const jwt = require("jsonwebtoken"),
  SECRET =
    "b56e521d3824e97829c83f29955f2bd16979858ac8fdadfe8eca516caa3532fda2eec7c6adc7dd30ad91c8b21d4ad4460aaed163b828bfe6367aa9665a71b4789ef8afd62caa1ddac6852fabe4d516aad972be8eb2778318a13566202ca7b8bc215fc0c7baf4ac879f0a160d75d05462b4713c048bfc17e8a1827629348fa568691beb6cb1397a2b1dbd4d7bd55ad3354563352ea7f5c5d5a678ab7c73f9c06e5ee584be5c606b3c54691d7c0d4cf51046410f1f34d9b53ee324871768a1875930b2eb0077cd01b4cd0daf5aad128a11d85bfadd61a3137d551b4fe530f230ace7f82f6d917d609631db3084e3f2f2a78694ccd26f23e75b9ab601e75822bf8c",
  ResponseHelper = require("../helpers/response.helper");
UserModel = require("../models/user.model");

exports.generateToken = (payload) =>
  jwt.sign(payload, `${SECRET}`, { expiresIn: 1000 });

exports.isAuthenticated = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      `${SECRET}`,
      (err, payload) => {
        err
          ? ResponseHelper(res, err.message, 403, false)
          : UserModel.findById(payload.id)
              .then((user) => {
                if (user) {
                  req.user = user;
                  next();
                } else ResponseHelper(res, "Unauthorized", 401, false);
              })
              .catch((err) => ResponseHelper(res, "Unauthorized", 500, false));
      }
    );
  } else ResponseHelper(res, err.message, 401, false);
};
