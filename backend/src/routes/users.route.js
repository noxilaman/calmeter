const urlname = "users";
var express = require("express");
const UsersController = require("../controllers/users.controller");
var router = express.Router();

const auth = require("../middleware/auth.middleware");

router.get(`/${urlname}/`,auth.verifyAdminToken, UsersController.findAll);
router.get(
  `/${urlname}/changestatus/:id/:status`,
  auth.verifyToken,
  UsersController.changestatus
);
router.get(`/${urlname}/:id`, auth.verifyToken, UsersController.findOne);
router.post(`/${urlname}/`, UsersController.create);
router.put(`/${urlname}/:id`, auth.verifyToken, UsersController.update);
router.delete(`/${urlname}/:id`, auth.verifyToken, UsersController.delete);

module.exports = router;
