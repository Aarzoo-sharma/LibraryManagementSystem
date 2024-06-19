const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { jwtTokenName, jwtOptions, createToken } = require("../JWT/jwt");

const prisma = new PrismaClient();

const adminLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    if (username.trim() == "" || password.trim() == "") {
      res.status(401).send({ type: "error", message: "invalid credentials" });
    } else {
      const result = await prisma.adminlog.findUnique({
        where: { username: username },
        select: { activeStatus: true, id: true, empName: true, password: true },
      });

      if (result != null) {
        if (result.activeStatus == "active") {
          bcrypt.compare(password, result.password).then(async (match) => {
            if (!match) {
              res.send({ type: "error", message: "Password doesn't match" });
            } else {
              const user = {
                id: result.id,
                name: result.empName,
                loggedIn: true,
              };
              const accessToken = await createToken(user);
              res.cookie(jwtTokenName, accessToken, jwtOptions);
              res.send({ loggedIn: true, username: result.empName });
            }
          });
        } else {
          res.send({
            type: "error",
            message: "Access Denied Account is been Blocked",
          });
        }
      } else {
        res.send({ type: "error", message: "username doesn't exist" });
      }
    }
  } catch (error) {
    console.log("error at login controller line 38");
    console.log(error);
    res.send({ type: "error", message: "something went wrong" });
  }
};

const checkAuth = async (req, res) => {
  if (req.user.loggedIn) {
    const result = await prisma.adminlog.findUnique({
      where: { id: req.user.id },
      select: { activeStatus: true, empName: true },
    });
    if (result.activeStatus == "active")
      res.send({ loggedIn: req.user.loggedIn, username: result.empName });
    else {
      res.clearCookie(jwtTokenName).send({
        loggedOut: true,
        type: "error",
        message: "you are been block",
      });
    }
  } else res.send({ loggedIn: false, username: "user" });
};

const adminLogout = (req, res) => {
  res.clearCookie(jwtTokenName).send({ loggedOut: true });
};

module.exports = { adminLogin, checkAuth, adminLogout };
