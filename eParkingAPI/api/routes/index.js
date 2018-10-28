const express = require("express");
const zonaParqueo = require("./zonaParqueo");

const router = express.Router();

router.use("/api", zonaParqueo);

module.exports = router;
