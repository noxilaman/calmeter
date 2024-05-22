const urlname = "groups";
var express = require("express");
const GroupsController = require("../controllers/groups.controller");
var router = express.Router();

const auth = require("../middleware/auth.middleware");

router.get(`/${urlname}/`, auth.verifyToken, GroupsController.findAll);
router.get(`/${urlname}/:id`, auth.verifyToken, GroupsController.findOne);
router.post(`/${urlname}/`, auth.verifyToken, GroupsController.create);
router.put(`/${urlname}/:id`, auth.verifyToken, GroupsController.update);
router.delete(`/${urlname}/:id`, auth.verifyToken, GroupsController.delete);

module.exports = router;
