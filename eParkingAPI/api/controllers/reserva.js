const Reserva = require("../models/reserva");
const utils = require("../../handlers/utils");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

function findAll(req, res) {
  Reserva.find({}, (err, reservas) => {
    utils.getResponse(res, err, reservas);
  });
}

function findById(req, res) {
  let id = req.params.id;
  Reserva.findById(id, (err, reserva) => {
    utils.getResponse(res, err, reserva);
  });
}

function create(req, res) {
  let newReserva = new Reserva({
    celda: req.body.celda,
    usuario: req.body.usuario,
    fecha: req.body.fecha
  });
  newReserva.save((err, reserva) => {
    utils.simpleResponse(res, err, reserva);
  });
}

function deleteById(req, res) {
  let id = req.params.id;
  Reserva.findOneAndDelete(id, (err, reserva) => {
    utils.getResponse(res, err, reserva);
  });
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

module.exports = {
  findAll,
  findById,
  create,
  deleteById
};
