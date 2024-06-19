const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBooksDetail = async (req, res) => {
  try {
    const result = await prisma.books.findMany({
      select: {
        issuedTo: true,
        issuebooks: { where: { status: "issued" } },
      },
      where: { issuedTo: { not: "blocked" } },
    });
    let bookIssued = 0;
    let overDueDate = 0;
    const date1 = new Date(); //current Date
    result.forEach((element) => {
      const date2 = new Date(element.issuebooks[0]?.dateOfReturn); // exprectedDateOfReturn
      const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
      if (element.issuedTo != "") bookIssued++;
      if (diffDays < 0) overDueDate++;
    });
    const response = [
      {
        name: "Total Books",
        value: result.length,
        changeType: "positive",
      },
      {
        name: "Books Issued",
        value: bookIssued,
        change: ((bookIssued / result.length) * 100).toFixed(2) + "%",
        changeType: "positive",
      },
      {
        name: "Books Issued Date Overdue",
        value: overDueDate,
        changeType: "negative",
      },
      {
        name: "Books Left",
        value: result.length - bookIssued,
        change:
          (((result.length - bookIssued) / result.length) * 100).toFixed(2) +
          "%",
        changeType: "positive",
      },
    ];
    res.send(response);
  } catch (error) {
    console.log("error atdashboardController line46 ");
    console.log(error);
  }
};

module.exports = { getBooksDetail };
