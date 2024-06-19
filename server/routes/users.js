const express = require("express");
const {
  deleteUser,
  createUser,
  usersDetail,
  updateUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/addUser").post(createUser);
router.route("/usersDetail").get(usersDetail);
router.route("/deleteUser").delete(deleteUser);
router.route("/updateUser").post(updateUser);

module.exports = router;
