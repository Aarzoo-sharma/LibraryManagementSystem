const express = require("express");
const { getBooksDetail } = require("../controller/dashboardController");
const router = express.Router();

router.route("/booksdetail").get(getBooksDetail);

module.exports = router;
