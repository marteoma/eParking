const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
require("./celda");

const Reserva = new Schema(
  {
    celda: {
      required: true,
      ref: "Celda",
      type: ObjectId
    },
    usuario: {
      required: true,
      type: String
    },
    activa: {
      type: Boolean,
      default: true
    }
  },
  { collection: "ep_reservas" }
);

module.exports = mongoose.model("Reserva", Reserva);
