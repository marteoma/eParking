const express = require("express");
const controller = require("../controllers/zonaParqueo");

const router = express.Router();

router.get("/zona/all", controller.findAll);
router.get("/zona/:id", controller.findById);
router.post("/zona", controller.create);
router.delete("/zona/:id", controller.deleteById);
router.get("/zona", controller.findByNombre);
router.get("/zona/celdas", controller.getCeldasByNombre);
router.get("/zona/:nombre/id", controller.getIdByNombre);

module.exports = router;
