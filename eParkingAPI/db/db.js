const mongoose = require("mongoose");
const keys = require("../config/keys");

require("../api/models/zonaParqueo");
require("../api/models/celda");

const db = mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

module.exports = db;
