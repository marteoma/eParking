const express = require("express");
const controller = require("../controllers/celda");

const router = express.Router();

router.get("/celda/all", controller.findAll);
router.get("/celda/:id", controller.deleteById);
router.post("/celda", controller.create);
router.delete("/celda/:id", controller.deleteById);
router.get("/celda", controller.findByZonaAndNombre);

module.exports = router;
