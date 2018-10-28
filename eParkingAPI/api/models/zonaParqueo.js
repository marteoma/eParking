const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZonaParqueo = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true
    },
    ubicacion: {
      type: String,
      required: true
    },
    novedades: {
      type: Array,
      default: []
    }
  },
  { collection: "ep_zonasParqueo" }
);

module.exports = mongoose.model("ZonaParqueo", ZonaParqueo);
