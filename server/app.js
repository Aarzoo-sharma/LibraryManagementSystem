const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./JWT/jwt");
const { checkAuth } = require("./controller/loginController");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ******* Routes *******
const adminRoute = require("./routes/admin");

app.use("/admin", adminRoute);

app.get("/checkAuth", validateToken, checkAuth);

app.listen(3000, () => {
  console.log("Server starts at 3000 port");
});
