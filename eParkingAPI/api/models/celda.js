const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
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
      enum: ["disponible", "ocupado", "reservado", "novedad"],
      required: true,
      default: "disponible"
    }
  },
  { collection: "ep_celdas" }
);

module.exports = mongoose.model("Celda", Celda);
