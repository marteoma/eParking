const express = require("express");
const controller = require("../controllers/celda");

const router = express.Router();

router.get("/celda/all", controller.findAll);
router.get("/celda/:id", controller.deleteById);
router.post("/celda", controller.createByZonaNombre);
router.delete("/celda/:id", controller.deleteById);
router.get("/celda", controller.findByZonaAndNombre);
router.put("/novedad", controller.changeNovedad);
router.delete("/novedad", controller.deleteNovedad);

module.exports = router;
