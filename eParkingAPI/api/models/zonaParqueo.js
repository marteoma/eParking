const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Celda = require("./celda");

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
    }
  },
  {
    collection: "ep_zonasParqueo"
  }
);

ZonaParqueo.post("findOneAndDelete", doc => {
  Celda.deleteMany({ zona: doc._id }, err => {
    if (err) {
      //TODO: Mejorar el manejo de este error
      console.log("Error borrando celdas");
    }
  });
});

module.exports = mongoose.model("ZonaParqueo", ZonaParqueo);
