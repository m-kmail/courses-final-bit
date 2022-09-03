const express = require("express");
const app = express();
const session = require("express-session");
app.use(session({ secret: "kmail" }));
const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://localhost/finalDB");
const api = require("./server/routes/api.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});

app.use("/", api);
app.listen(5000, () => {
  console.log("working on port 5000");
});
