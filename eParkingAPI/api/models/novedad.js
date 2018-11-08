const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Novedad = new Schema({
  descripcion: {
    type: String,
    required: true
  },
  activa: {
    type: Boolean,
    required: true,
    default: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Novedad;
