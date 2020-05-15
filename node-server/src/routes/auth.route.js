const Router = require("express"),
  router = Router(),
  { signup, signin } = require("../controllers/auth.controllers"),
  { RegistrationValidator, LoginValidator } = require("../helpers/index");

module.exports = router;

router.post("/register", RegistrationValidator, signup);
router.post("/login", LoginValidator, signin);
