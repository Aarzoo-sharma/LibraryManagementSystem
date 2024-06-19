const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("./env.js");

// for verifying account
async function sendMail({ name, email, i, bookTitle, date, fine, token }) {
  let sub = [
    "Registration to Kathua Campus Library",
    "Book Issued from Kathua Campus Library",
    "Book Returned to Kathua Campus Library",
    "Book Return Date Overdue",
    "Reset your account Password",
    "Password Changed",
  ];
  let intro = [
    "Registration successful to Kathua Campus Library.",
    '<b>"' + bookTitle + '"</b> is issued to you on ' + date,
    '<b>"' + bookTitle + '"</b> is returned successfully.',
    '<b>"' + bookTitle + '"</b> return date is overdue.',
    "Reset your account Password",
    "Password is changed successfully.",
  ];
  let instr = [
    "You are registered to Kathua Campus library, now you can issue book.",
    "Thank you for issueing the book from kathua campus, please take care of the book and return the book before date of return to avoid fine",
    "Thank you for returning book, your book is returned on " +
      date +
      "with a fine of Rs. " +
      fine +
      ". <br> Please visit again.",
    "The date of returning book " +
      '<b>"' +
      bookTitle +
      '</b>" is overdue by <b>"' +
      date +
      '</b>". Please return the book. to avoid fine',
    "please click here, to reset your account password: this mail is valid for 10mins only",
    "your password is changed successfully. Please login your account with new password.",
  ];
  let text = "Reset Password";
  let link = `http://localhost:5173/resetPassword/${token}`;

  let outro = [
    "Please follow the basic library rules",
    "Please return the book before the date of return",
    "Visit again.",
    "For any query please visit library.",
    "For any query please contact Super Admin.",
    "For any query please contact Super Admin.",
  ];

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Kathua Campus library",
      link: "http://localhost:5173/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: intro[i],
      action: {
        instructions: instr[i],
        button: token
          ? {
              color: "#22BC66", // Optional action button color
              text,
              link,
            }
          : {},
      },
      outro: outro[i],
    },
  };

  let mail = mailGenerator.generate(response);

  const message = {
    from: EMAIL,
    to: email,
    subject: sub[i],
    html: mail,
  };
  require("dns").resolve("www.google.com",async function (err) {
    if (err) {
      return true
    } else {
      let result = await transporter.sendMail(message);
      return !!result.accepted.length;
    }
  });
}
module.exports = { sendMail };
