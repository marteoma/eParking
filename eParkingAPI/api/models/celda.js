const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Novedad = require("./novedad");
require("./zonaParqueo");

const Celda = new Schema(
  {
    codigo: {
      type: String,
      required: true
    },
    zona: {
      type: ObjectId,
      ref: "ZonaParqueo",
      required: true
    },
    estado: {
      type: String,
      required: true,
      default: "disponible",
      enum: ["disponible", "ocupado", "reservado", "novedad"]
    },
    novedad: {
      type: Novedad
    }
  },
  { collection: "ep_celdas" }
);

Celda.index({ zona: 1, codigo: 1 }, { unique: true });

module.exports = mongoose.model("Celda", Celda);
