const Fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// add books from csv file
const csvFileHandler = (req, res) => {
  try {
    let filePath = req.file.path;
    let inCompleteData = false;
    Fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (data) => {
        const bookId = parseInt(data.accession_no) || undefined;
        const author = data.author.trim();
        const title = data.title.trim();
        const place_publisher = data.place_publisher.trim();
        const edition = data.edition.trim();
        const year = parseInt(data.year);
        const pages = parseInt(data.pages);
        const source = data.source.trim();
        const billNo = parseInt(data.billNo);
        const BillDate = new Date(data.BillDate);
        const cost = parseFloat(data.cost);
        const updatedByEmp = req.user.name;
        if (
          author &&
          title &&
          place_publisher &&
          edition &&
          year &&
          pages &&
          source &&
          billNo &&
          BillDate &&
          cost
        ) {
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
        } else {
          inCompleteData = true;
        }
      })
      .on("error", (err) => {
        console.log("error at csvFileReader line 59", err);
        res.send({
          type: "error",
          message:
            "some Books are added successfully while some have error:- " +
            err.message,
        });
      })
      .on("end", () => {
        if (inCompleteData) {
          res.send({
            type: "info",
            message:
              "Books are added successfully while some have inCompelete data",
          });
        } else {
          Fs.unlink(filePath, (err) => {
            //to delete file from server after processing
            if (err) console.log("error at csvFileReader line 59", err);
            else
              res.send({
                type: "success",
                message: "Books are added successfully",
              });
          });
        }
      });
  } catch (error) {
    console.log("error at csvFileReader line87");
    console.log(error);
    res.send({ type: "error", message: error.name });
  }
};

module.exports = {
  csvFileHandler,
};
