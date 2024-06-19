const express = require("express");
const {
  getBookAndUserDetails,
  createBook,
  issueBook,
  issuedBook,
  returnBook,
  validateReturnBook,
  updateBook,
  deleteBook,
} = require("../controller/booksController");
const {
  getAllIssuedBookDetail,
  getIssuedBooks,
  getBooksOverDue,
  getAllBookDetail,
  sendOverDueBooksMail,
} = require("../controller/booksIssuedController");

const multer = require("multer");
const { csvFileHandler } = require("../controller/CsvFileReader");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/createBook").post(createBook);
router.route("/updateBook").post(updateBook).delete(deleteBook);
router.route("/addCsvFile").post(upload.single("csvFile"), csvFileHandler);
router.route("/issueBook").get(getBookAndUserDetails).post(issueBook);
router.route("/returnBook").get(issuedBook).put(returnBook);
router.route("/validateReturnBook").post(validateReturnBook);
router.route("/getAllBookDetail").get(getAllBookDetail);
router.route("/getAllIssuedBookDetail").get(getAllIssuedBookDetail);
router.route("/getIssuedBooks").get(getIssuedBooks);
router.route("/getBooksOverDue").get(getBooksOverDue);
router.route("/overDueMail").post(sendOverDueBooksMail);

module.exports = router;
