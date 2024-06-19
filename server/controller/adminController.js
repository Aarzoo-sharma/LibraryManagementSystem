const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { nanoid } = require("nanoid");
const { sendMail } = require("./mailController");

const prisma = new PrismaClient();

const createAdmin = async (req, res) => {
  try {
    if (req.user.id == 1 || req.user.id == 2) {
      const username = req.body.username;
      const empName = req.body.empName;
      const email = req.body.email;
      const createdByEmp = req.user.name;
      const password = req.body.password;
      const confPassword = req.body.confPassword;
      if (!password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}")) {
        res.send({
          type: "error",
          message:
            "password should be of length 8,one upper character and one lower charater atlest and have a number",
        });
      } else if (
        password.trim() == confPassword.trim() &&
        password.trim() != ""
      ) {
        try {
          const hashedPassword = bcrypt.hashSync(password, 10);
          const result = await prisma.adminlog.upsert({
            create: {
              empName,
              username,
              email,
              password: hashedPassword,
              createdByEmp,
            },
            update: {
              empName,
              username,
              email,
              password: hashedPassword,
              activeStatus: "active",
              createdByEmp,
            },
            where: { email },
          });
          if (result.id > 1)
            res.send({ type: "success", message: "User created successfully" });
          else
            res.send({
              type: "error",
              message: "can not perform this task at the moment",
            });
        } catch (error) {
          console.log("error at create Admin line no 26");
          console.log(error);
          if (error.code == "P2002")
            res.send({
              type: "error",
              message: error.meta.target + " already exist",
            });
          else res.send({ type: "error", message: JSON.stringify(error) });
        }
      } else {
        res.send({
          type: "warning",
          message: "password must match and can not be empty",
        });
      }
    } else {
      res.send({
        type: "error",
        message: "you are not allowed to this type of work",
      });
    }
  } catch (error) {
    console.log("error at adminController -- createAdmin");
    console.log(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (req.user.id < 2) {
      const id = parseInt(req.body.id);
      const result = await prisma.adminlog.update({
        data: { activeStatus: "blocked" },
        where: {
          id,
        },
        select: { empName: true },
      });
      if (result)
        res.send({ type: "success", message: result.empName + " is Blocked" });
    } else {
      res.send({
        type: "warning",
        message: "you are not allowed to this type of Action",
      });
    }
  } catch (error) {
    console.log("error at adminController --deleteAdmin");
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  let email = req.body.email;
  try {
    const result = await prisma.adminlog.findUniqueOrThrow({
      where: { email },
    });
    let token = nanoid(50);
    await prisma.resetPassword.upsert({
      create: { adminId: result.id, token, time: Date.now() + "" },
      update: { time: Date.now() + "", token },
      where: { resetPasswordId: 1 },
      select: { adminlog: { select: { empName: true, email: true } } },
    });
    await sendMail({
      name: result.empName,
      email: result.email,
      i: 4,
      token: token,
    });
    res.send({ type: "success", message: "Mail send successfully!!!" });
  } catch (error) {
    console.log("error at adminController --forgetPassword ");
    console.log(error);
    if (error.code == "P2025")
      res.send({ type: "error", message: "Email not found!!!" });
  }
};

const resetPassword = async (req, res) => {
  try {
    let token = req.params.token;
    let password = req.body.password;
    let confPassword = req.body.confPassword;

    if (password.trim() == "" || confPassword.trim() == "") {
      res.send({ type: "error", message: "invalid input" });
      return;
    } else if (
      password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}") &&
      password == confPassword
    ) {
      const result = await prisma.resetPassword.findFirstOrThrow({
        where: { token },
      });

      if (Date.now() - result.time > 600000) {
        //if user try to reset password after 10mins
        res.send({
          type: "error",
          message: "session expire please request for new mail",
        });
        return;
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          prisma.adminlog
            .update({
              where: { id: result.adminId },
              data: { password: hash },
            })
            .then((response) => {
              sendMail({ name: response.empName, email: response.email, i: 5 });
              prisma.resetPassword
                .delete({ where: { resetPasswordId: result.resetPasswordId } })
                .then((response) => {
                  res.send({
                    type: "success",
                    message: "Password Changed Successfully!!!",
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              res.send({ type: "error", message: JSON.stringify(error) });
            });
        });
      }
    } else {
      res.send({
        type: "warning",
        message: "password doesn't match or password is invalid",
      });
    }
  } catch (error) {
    console.log("error at adminController --resetPassword ");
    console.log(error);
    if (error.code == "P2025")
      res.send({
        type: "error",
        message: "token not found!!! please request for new mail",
      });
  }
};

const allAdminDetails = async (req, res) => {
  try {
    if (req.user.id > 2) {
      res.status(401).send({
        type: "warning",
        message: "you are not allowed to perform any action here",
      });
    } else {
      const id = req.user.id;
      const result = await prisma.adminlog.findMany({
        where: { id: { notIn: [1, id] }, activeStatus: "active" },
        select: {
          id: true,
          email: true,
          empName: true,
          username: true,
          createdByEmp: true,
          activeStatus: true,
        },
      });
      res.send(result);
    }
  } catch (error) {
    console.log("error at adminController --allAdminDetails ");
    console.log(error);
  }
};
module.exports = {
  createAdmin,
  deleteAdmin,
  forgetPassword,
  resetPassword,
  allAdminDetails,
};
