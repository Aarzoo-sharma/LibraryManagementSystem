const express = require("express");
const {
  adminDetail,
  changePassword,
  changeEmpName,
  changeEmail,
  changeUsername,
} = require("../controller/adminProfileController");

const router = express.Router();

router.route("/adminDetail").get(adminDetail);
router.route("/changeEmpName").patch(changeEmpName);
router.route("/changeEmail").patch(changeEmail);
router.route("/changeUsername").patch(changeUsername);
router.route("/changePassword").post(changePassword);

module.exports = router;
