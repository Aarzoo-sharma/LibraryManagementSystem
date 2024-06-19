const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("./mailController");

const prisma = new PrismaClient();

const adminDetail = async (req, res) => {
  try {
    const result = await prisma.adminlog.findUniqueOrThrow({
      where: { id: req.user.id },
      select: {
        empName: true,
        username: true,
        email: true,
        activeStatus: true,
        createdByEmp: true,
      },
    });
    res.send(result);
  } catch (error) {
    console.log("error at adminProfileController --adminDetail");
    console.log(error);
  }
};

const changeEmpName = async (req, res) => {
  res.send({ type: "warning", message: "You Can't change your name" });
  return;
  try {
    const empName = req.body.empName;
    const id = req.user.id;
    const result = await prisma.adminlog.update({
      where: { id },
      data: { empName },
    });
    if (result)
      res.send({
        type: "success",
        message: "Employee name changed successFully",
      });
  } catch (error) {
    console.log("error at adminProfileController --changeEmpName ");
    console.log(error);
    res.send({ type: "error", message: JSON.stringify(error) });
  }
};

const changeEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const id = req.user.id;
    const result = await prisma.adminlog.update({
      where: { id },
      data: { email },
    });
    if (result)
      res.send({
        type: "success",
        message: "Employee email changed successFully",
      });
  } catch (error) {
    console.log("error at adminProfileController --changeEmail ");
    console.log(error);
    res.send({ type: "error", message: JSON.stringify(error) });
  }
};

const changeUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const id = req.user.id;
    const result = await prisma.adminlog.update({
      where: { id },
      data: { username },
    });
    if (result)
      res.send({
        type: "success",
        message: "Employee username changed successFully",
      });
  } catch (error) {
    console.log("error at adminProfileController --changeUsername ");
    console.log(error);
    res.send({ type: "error", message: JSON.stringify(error) });
  }
};

const changePassword = async (req, res) => {
  try {
    let currPassword = req.body.currPassword;
    let password = req.body.password;
    let confPassword = req.body.confPassword;
    const id = req.user.id;
    const checkPassword = await prisma.adminlog.findUniqueOrThrow({
      where: { id },
      select: { password: true },
    });
    if (bcrypt.compareSync(currPassword, checkPassword.password)) {
      if (password.trim() == "" || confPassword.trim() == "") {
        res.send({ type: "error", message: "invalid input" });
        return;
      } else if (
        password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}") &&
        password == confPassword
      ) {
        password = bcrypt.hashSync(password, 10);
        const result = await prisma.adminlog.update({
          data: { password },
          where: { id },
          select: { id: true },
        });
        if (result) {
          res.send({
            type: "success",
            message: "Password changed Successfully",
          });
        }
      }
    } else {
      res.send({ type: "error", message: "current Password does not match" });
    }
  } catch (error) {
    console.log("error at adminProfileController --changePassword ");
    console.log(error);
    res.send({ type: "error", message: JSON.stringify(error) });
  }
};

module.exports = {
  adminDetail,
  changeEmpName,
  changeEmail,
  changeUsername,
  changePassword,
};
