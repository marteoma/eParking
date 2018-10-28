const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ZonaParqueo = mongoose.model("ZonaParqueo");
const ObjectId = Schema.Types.ObjectId;

const Celda = new Schema(
  {
    codigo: String,
    zona: {
      type: ObjectId,
      ref: "ZonaParqueo",
      required: true
    }
  },
  { collection: "ep_celdas" }
);

module.exports = mongoose.model("Celda", Celda);
