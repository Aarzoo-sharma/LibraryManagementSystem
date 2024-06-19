const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("./mailController");

const prisma = new PrismaClient();

const createBook = async (req, res) => {
  // manually add book
  const bookId = req.body.accession_no || undefined;
  const author = req.body.author;
  const title = req.body.title;
  const place_publisher = req.body.place_publisher;
  const edition = req.body.edition;
  const year = parseInt(req.body.year);
  const pages = req.body.pages;
  const source = req.body.source;
  const billNo = req.body.billNo;
  const BillDate = new Date(req.body.billDate);
  const cost = req.body.cost;
  const updatedByEmp = req.user.name;
  try {
    await prisma.books.create({
      data: {
        bookId,
        author,
        title,
        place_publisher,
        edition,
        year,
        pages,
        source,
        billNo,
        BillDate,
        cost,
        updatedByEmp,
      },
    });
    res.send({ type: "success", message: "Book added Successfully" });
  } catch (error) {
    console.log("error at bookController line38");
    console.log(error);
    if (error.code == "P2002")
      res.send({ type: "error", message: "Accession no should be unique" });
    else res.send({ type: "error", message: error.name });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.body.bookId;
  const author = req.body.author;
  const title = req.body.title;
  const place_publisher = req.body.place_publisher;
  const edition = req.body.edition;
  const year = parseInt(req.body.year);
  const pages = req.body.pages;
  const source = req.body.source;
  const billNo = req.body.billNo;
  const BillDate = new Date(req.body.billDate);
  const cost = req.body.cost;
  const updatedByEmp = req.user.name;
  try {
    const result = await prisma.books.update({
      data: {
        author,
        title,
        place_publisher,
        edition,
        year,
        pages,
        source,
        billNo,
        BillDate,
        cost,
        updatedByEmp,
      },
      where: { bookId, issuedTo: "" },
    });
    res.send({
      type: "success",
      message: "Book updated Successfully",
      data: result,
    });
  } catch (error) {
    console.log("error at bookController line79");
    console.log(error);
    if (error.code == "P2002")
      res.send({ type: "error", message: "Accession no should be unique" });
    else if (error.code == "P2025")
      res.send({
        type: "warning",
        message: "Can't update any change in Issued book",
      });
    else res.send({ type: "error", message: error.name });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.body.bookId;
    const result = await prisma.books.update({
      where: { bookId, issuedTo: "" },
      data: { issuedTo: "blocked" },
    });
    res.send({
      type: "success",
      message: "Book deleted successFully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    if (error.code == "P2025")
      res.send({ type: "warning", message: "Can't delete issued Book" });
    else res.send({ type: "error", message: error.name });
  }
};

// function to get all book which are not issued and users
const getBookAndUserDetails = async (req, res) => {
  try {
    const result = {
      user: await prisma.user.findMany({
        where: { activeStatus: "active" },
        select: { uniqueUserId: true, userId: true },
      }),
      books: await prisma.books.findMany({
        where: { issuedTo: "" },
        select: { bookId: true, title: true },
      }),
    };
    res.send(result);
  } catch (error) {
    console.log("error at bookController line58");
    console.log(error);
    res.send({
      type: "error",
      message: "something went wrong please refresh or try again",
    });
  }
};

// function to check a user can issue book or not
const canIssueBook = async (userId) => {
  try {
    const { designation } = await prisma.user.findUniqueOrThrow({
      where: { userId: userId },
      select: { designation: true },
    });
    const haveBook = await prisma.issuebooks.count({
      where: { userId: userId, status: "issued" },
    });
    switch (designation.toLowerCase()) {
      case "faculity":
        return haveBook < 10 ? 30 : false;
      case "nonteachingstaff":
        return haveBook < 2 ? 30 : false;
      case "researchschollars":
        return haveBook < 5 ? 14 : false;
      case "student":
        return haveBook < 2 ? 14 : false;
    }
  } catch (error) {
    console.log("error at bookController line84");
    console.log(error);
    return false;
  }
};

// issue a book to user
const issueBook = async (req, res) => {
  const userId = parseInt(req.body.userId);
  const bookId = parseInt(req.body.accession_no);
  const dateOfIssue = new Date(req.body.dateOfIssue);
  try {
    if (userId == "" || bookId == "") {
      res.send({ type: "error", message: "Please enter a valid input" });
      return;
    }
    const dateOfReturn = new Date(req.body.dateOfIssue);
    const issuedByEmp = req.user.name;
    const noOfDays = await canIssueBook(userId);
    dateOfReturn.setDate(dateOfIssue.getDate() + noOfDays);
    if (noOfDays) {
      prisma.books
        .update({
          data: { issuedTo: userId + "" },
          where: { bookId },
        })
        .then(async (response) => {
          prisma.issuebooks
            .create({
              data: {
                bookId,
                userId,
                dateOfIssue,
                dateOfReturn,
                issuedByEmp,
              },
              select: {
                dateOfIssue: true,
                user: { select: { name: true, email: true } },
                books: { select: { title: true } },
              },
            })
            .then((response) => {
              sendMail({
                name: response.user.name,
                email: response.user.email,
                i: 1,
                bookTitle: response.books.title,
                date: response.dateOfIssue.toDateString(),
              }).then((response) => {
                res.send({
                  type: "success",
                  message: "Book Issued successfully!!!",
                });
              });
            });
        });
    } else {
      res.send({
        type: "error",
        message: "can't issue book you already have many more",
      });
    }
  } catch (error) {
    console.log("error at bookController line126");
    console.log(error);
    res.send({
      type: "error",
      message: "something went wrong",
    });
  }
};

//return book starts
const issuedBook = async (req, res) => {
  try {
    const result = await prisma.issuebooks.findMany({
      where: { status: "issued" },
      select: {
        issuedBookId: true,
        books: { select: { bookId: true, title: true } },
      },
    });
    res.send(result);
  } catch (error) {
    console.log("error at bookController line143");
    console.log(error);
  }
};

async function calculateFine(ExpectedDate, dateOfReturn) {
  try {
    let fine = 0;
    const date1 = ExpectedDate;
    const date2 = new Date(dateOfReturn);
    const diffTime = date2 - date1;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    if (days <= 20) {
      fine = 10 * days;
    } else if (days > 20) {
      fine = 20 * days + 2 * days;
    }
    return fine;
  } catch (error) {
    console.log("error at bookController line163");
    console.log(error);
  }
}

const validateReturnBook = async (req, res) => {
  const issuedBookId = parseInt(req.body.issuedBookId);
  const dateOfReturn = req.body.dateOfReturn;
  try {
    const result = await prisma.issuebooks.findUniqueOrThrow({
      where: { issuedBookId },
      select: {
        dateOfIssue: true,
        dateOfReturn: true,
        user: { select: { name: true, uniqueUserId: true } },
      },
    });
    const fine = await calculateFine(result.dateOfReturn, dateOfReturn);
    res.send({ dateOfIssue: result.dateOfIssue, ...result.user, fine });
  } catch (error) {
    console.log("error at bookController line183");
    console.log(error);
  }
};

const returnBook = async (req, res) => {
  //update this
  try {
    const issuedBookId = parseInt(req.body.issuedBookId);

    if (!req.body.dateOfReturn) {
      res.send({ type: "error", message: "Date Required!!!" });
      return;
    }
    const dateOfReturn = new Date(req.body.dateOfReturn);
    const libraryPenalty = parseFloat(req.body.libraryPenalty) || 0;
    const collectedByEmp = req.user.name;
    const expectedDate = await prisma.issuebooks.findUniqueOrThrow({
      where: { issuedBookId },
      select: { dateOfReturn: true },
    });
    let fine =
      (await calculateFine(expectedDate.dateOfReturn, dateOfReturn)) +
      libraryPenalty;
    prisma.issuebooks
      .update({
        where: { issuedBookId },
        data: {
          fine,
          dateOfReturn,
          status: "returned",
          collectedByEmp,
        },
        select: {
          dateOfReturn: true,
          bookId: true,
          fine: true,
          user: { select: { name: true, email: true } },
          books: { select: { title: true } },
        },
      })
      .then(async (response) => {
        await prisma.books.update({
          data: { issuedTo: "" },
          where: { bookId: response.bookId },
        });
        await sendMail({
          name: response.user.name,
          email: response.user.email,
          i: 2,
          bookTitle: response.books.title,
          date: response.dateOfReturn.toDateString(),
          fine: response.fine,
        });
        res.send({ type: "success", message: "Book returned sucessfully" });
      });
  } catch (error) {
    console.log("error at bookController line220");
    console.log(error);
    res.send({ type: "error", message: error.name });
  }
};

module.exports = {
  getBookAndUserDetails,
  updateBook,
  deleteBook,
  validateReturnBook,
  issuedBook,
  createBook,
  issueBook,
  returnBook,
};
