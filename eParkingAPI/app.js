const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const router = require("./api/routes/index");

const app = express();
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send(`Error de servidor: ${err}`);
  //TODO: Personalizar según error
});

module.exports = app;
