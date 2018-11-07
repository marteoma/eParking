const express = require("express");
const controller = require("../controllers/reserva");

const router = express.Router();

router.get("/reserva/all", controller.findAll);
router.get("/reserva/:id", controller.deleteById);
router.post("/reserva", controller.create);
router.delete("/reserva/:id", controller.deleteById);
router.put("/reserva/:id", controller.terminarReserva);

module.exports = router;
