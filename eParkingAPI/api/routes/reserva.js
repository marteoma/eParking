const express = require("express");
const controller = require("../controllers/reserva");

const router = express.Router();

router.get("/reserva", controller.findAll);
router.get("/reserva/:id", controller.deleteById);
router.post("/reserva", controller.create);
router.delete("/reserva/:id", controller.deleteById);

module.exports = router;
