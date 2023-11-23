const express = require("express");
const app = express();
const logger = require("morgan");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  credentials:true,
  origin:'http://localhost:3000',
  ptionsSuccessStatus: 200
}));
require("dotenv").config();


const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));


app.use("/api/users", userRouter);

app.all("*", (_, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });
  
  app.use((err, _, res, __) => {
    res.status(err.status || 500).json({
      message: err.message,
    });
  });
  
  module.exports = app;