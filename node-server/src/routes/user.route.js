const Router = require("express"),
  router = Router(),
  { fetchUsersList } = require("../controllers/user.controller");

module.exports = router;

router.get("/users", fetchUsersList);
