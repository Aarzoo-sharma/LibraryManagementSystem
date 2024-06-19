const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("./mailController");

const prisma = new PrismaClient();

const getAllBookDetail = async (req, res) => {
  try {
    const result = await prisma.books.findMany({
      where: { issuedTo: { not: "blocked" } },
    });
    res.send(result);
  } catch (error) {
    console.log("error at booksIssuedController --getAllBookDetail ");
    console.log(error);
  }
};

const getAllIssuedBookDetail = async (req, res) => {
  try {
    const result = await prisma.issuebooks.findMany({
      select: {
        dateOfIssue: true,
        dateOfReturn: true,
        fine: true,
        status: true,
        user: {
          select: {
            name: true,
            uniqueUserId: true,
            designation: true,
            department: true,
          },
        },
        books: { select: { author: true, title: true, bookId: true } },
      },
    });
    res.send(result);
  } catch (error) {
    console.log("error at booksIssuedController --getAllIssuedBookDetail ");
    console.log(error);
  }
};
const getIssuedBooks = async (req, res) => {
  try {
    const result = await prisma.issuebooks.findMany({
      where: {
        status: "issued",
      },
      select: {
        dateOfIssue: true,
        dateOfReturn: true,
        status: true,
        books: { select: { author: true, title: true, bookId: true } },
        user: {
          select: {
            name: true,
            department: true,
            designation: true,
            uniqueUserId: true,
            phone_no: true,
          },
        },
      },
    });
    res.send(result);
  } catch (error) {
    console.log("error at booksIssuedController --getIssuedBooks ");
    console.log(error);
  }
};

const getBooksOverDue = async (req, res) => {
  try {
    const date = new Date();
    const result = await prisma.issuebooks.findMany({
      where: {
        status: "issued",
        dateOfReturn: { lte: date },
      },
      select: {
        dateOfIssue: true,
        dateOfReturn: true,
        status: true,
        issuedBookId: true,
        books: { select: { author: true, title: true, bookId: true } },
        user: {
          select: {
            name: true,
            department: true,
            designation: true,
            phone_no: true,
            uniqueUserId: true,
          },
        },
      },
    });
    res.send(result);
  } catch (error) {
    console.log("error at booksIssuedController ");
    console.log(error);
  }
};

const sendOverDueBooksMail = async (req, res) => {
  try {
    let issuedBookId = req.body.issuedBookId;
    issuedBookId = issuedBookId.map((element) => parseInt(element));
    const result = await prisma.issuebooks.findMany({
      where: { issuedBookId: { in: issuedBookId } },
      select: {
        dateOfReturn: true,
        books: { select: { title: true } },
        user: { select: { name: true, email: true } },
      },
    });
    result.forEach(async (element) => {
      try {
        await sendMail({
          name: element.user.name,
          email: element.user.email,
          i: 3,
          bookTitle: element.books.title,
          date: element.dateOfReturn.toDateString(),
        });
      } catch (error) {
        console.log(error);
      }
    });
    res.send({ type: "success", message: "mail send successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllBookDetail,
  getAllIssuedBookDetail,
  getBooksOverDue,
  getIssuedBooks,
  sendOverDueBooksMail,
};
