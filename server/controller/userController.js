const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("./mailController");

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const name = req.body.name;
  const designation = req.body.designation;
  const uniqueUserId = req.body.uniqueUserId.toUpperCase();
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const department = req.body.department;
  const createdByEmp = req.user.name;
  try {
    const result = await prisma.user.create({
      data: {
        name,
        uniqueUserId,
        email,
        phone_no,
        designation,
        department,
        createdByEmp,
      },
    });
    if (result) {
      await sendMail({ name: result.name, email: result.email, i: 0 }).then(
        (result) => {
          if (result) {
            res.send({ type: "success", message: "user created succesfully" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    if (error.code == "P2002") {
      res.send({
        type: "error",
        message: error.meta.target + " already exist",
      });
    } else {
      res.send({ type: "error", message: error.name });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const uniqueUserId = req.body.uniqueUserId;
    const name = req.body.name;
    const department = req.body.department;
    const designation = req.body.designation;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const createdByEmp = req.user.name;
    const check = await prisma.user.count({
      where: { userId, issuebooks: { some: { status: "issued" } } },
    });
    if (check == 0) {
      const result = await prisma.user.update({
        data: {
          name,
          uniqueUserId,
          department,
          designation,
          email,
          phone_no,
          createdByEmp,
        },
        where: { userId },
      });
      if (result) {
        res.send({
          type: "success",
          message: "User Details are Updated SuccessFully",
          data: result,
        });
      }
    } else {
      res.send({
        type: "warning",
        message: "can't update user detail as user have issued book",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code == "P2002") {
      res.send({
        type: "error",
        message: error.meta.target + " already exist",
      });
    } else {
      res.send({ type: "error", message: error.name });
    }
  }
};

const deleteUser = async (req, res) => {
  const deleteType = req.body.deleteType;
  const uniqueUserId = req.body.uniqueUserId;
  const batchNo = req.body.batchNo;
  const department = req.body.department;
  try {
    let result;
    //checking if the batch or user has issued book then dont delete until book is returned
    if (deleteType == "batch") {
      result = await prisma.user.count({
        where: {
          uniqueUserId: { endsWith: "%" + department + batchNo },
          issuebooks: { some: { status: "issued" } },
        },
      });
    } else {
      result = await prisma.user.count({
        where: { uniqueUserId, issuebooks: { some: { status: "issued" } } },
      });
    }
    //if no book is issued delete the user
    if (!result)
      if (deleteType == "batch") {
        result = await prisma.user.updateMany({
          where: {
            uniqueUserId: { endsWith: "%" + department + batchNo },
            activeStatus: "active",
          },
          data: {
            activeStatus: "blocked",
          },
        });
        if (result.count == 0)
          throw { code: "P2025", meta: { cause: "Batch Not Found" } };
        else
          res.send({
            type: "success",
            message: "Users deleted successfully",
          });
      } else {
        result = await prisma.user.update({
          where: { uniqueUserId, activeStatus: "active" },
          data: {
            activeStatus: "blocked",
          },
        });
        res.send({ type: "success", message: "user deleted successfully" });
      }
    else {
      res.send({ type: "info", message: "User has not retured the book" });
    }
  } catch (error) {
    console.log(error);
    if (error.code == "P2025")
      res.send({ type: "info", message: error.meta.cause });
    else res.send({ type: "info", message: error.name });
  }
};

const usersDetail = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      where: { activeStatus: "active" },
    });
    res.send(result);
  } catch (error) {
    console.log("error at userController --usersDetail");
    console.log(error);
    res.send({ type: "error", message: error.name });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  usersDetail,
};
