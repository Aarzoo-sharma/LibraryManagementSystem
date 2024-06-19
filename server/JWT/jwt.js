const { PrismaClient } = require("@prisma/client");
const { sign, verify } = require("jsonwebtoken");

const prisma = new PrismaClient();

const privateKey = "jwtSecreateLibraryKey";
const jwtTokenName = "uuidverify";
const jwtOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 10, //ten days
  secure: false,
};

const createToken = async (user) => {
  const tokenData = { ...user };
  const accessToken = sign(tokenData, privateKey, { algorithm: "HS384" });
  const encryptedAccessToken = Buffer.from(accessToken).toString("hex"); //encrypting jwt token for better protection
  return encryptedAccessToken;
};

const validateToken = async (req, res, next) => {
  const accessToken = req.cookies[jwtTokenName];
  if (!accessToken) res.status(400).send({ notLoggedin: true });
  try {
    const decryptedAccessToken = Buffer.from(accessToken, "hex").toString(); //decryping jwt token
    const validToken = verify(decryptedAccessToken, privateKey);
    if (validToken) {
      req.user = validToken;
      const result = await prisma.adminlog.findUniqueOrThrow({
        where: { id: validToken.id },
        select: { activeStatus: true },
      });
      if (result.activeStatus == "active") return next();
      else
        res.clearCookie(jwtTokenName).send({
          loggedOut: true,
          type: "success",
          message: "You are Block or something happen wrong",
        });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createToken, jwtTokenName, validateToken, jwtOptions };
