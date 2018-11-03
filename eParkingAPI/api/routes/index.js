const express = require("express");
const zonaParqueo = require("./zonaParqueo");
const celda = require("./celda");
const reserva = require("./reserva");

const router = express.Router();

router.use("/api", zonaParqueo);
router.use("/api", celda);
router.use("/api", reserva);

module.exports = router;
