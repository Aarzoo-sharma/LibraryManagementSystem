const express = require("express");
const {
  createAdmin,
  deleteAdmin,
  forgetPassword,
  resetPassword,
  allAdminDetails,
} = require("../controller/adminController");
const { adminLogin, adminLogout } = require("../controller/loginController");

const { validateToken } = require("../JWT/jwt");

const router = express.Router();

const bookRoute = require("./book");
const userRoute = require("./users");
const dashboardRoute = require("./dashboard");
const adminProfileRouter = require("./profile");

router.use("/dashboard", dashboardRoute);
router.use("/book", validateToken, bookRoute);
router.use("/manageUser", validateToken, userRoute);
router.use("/adminProfile", validateToken, adminProfileRouter);

router.route("/login").post(adminLogin);
router.route("/logout").get(adminLogout);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").post(resetPassword);

router.route("/allAdminDetails").get(validateToken, allAdminDetails);
router.route("/createAdmin").post(validateToken, createAdmin);
router.route("/deleteAdmin").delete(validateToken, deleteAdmin);

module.exports = router;
