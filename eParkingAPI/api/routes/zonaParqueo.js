const express = require("express");
const controller = require("../controllers/zonaParqueo");

const router = express.Router();

router.get("/zona/all", controller.findAll);
router.get("/zona/:id", controller.deleteById);
router.post("/zona", controller.create);
router.put("/zona/:id", controller.updateNovedades);
router.delete("/zona/:id", controller.deleteById);
router.get("/zona", controller.findByNombre);
router.get("/zona/:nombre/celdas", controller.getCeldasByNombre);

module.exports = router;
