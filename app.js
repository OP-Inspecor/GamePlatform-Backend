const express = require("express");
const app = express();
const logger = require("morgan");
var cors = require("cors");
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000',
  ptionsSuccessStatus: 200
}));
require("dotenv").config();

app.use(express.json());
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

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