const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
require("./zonaParqueo");

const Reserva = new Schema(
  {
    celda: {
      required: true,
      type: ObjectId
    },
    user: {
      required: true,
      type: String
    },
    fecha: {
      required: true,
      type: Date
    }
  },
  { collection: "ep_reservas" }
);

module.exports = mongoose.model("Reserva", Reserva);