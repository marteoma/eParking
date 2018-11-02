const express = require("express");
const controller = require("../controllers/celda");

const router = express.Router();

router.get("/celda", controller.findAll);
router.get("/celda/:id", controller.deleteById);
router.post("/celda", controller.create);
router.delete("/celda/:id", controller.deleteById);

module.exports = router;
