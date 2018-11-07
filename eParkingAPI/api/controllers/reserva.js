const Reserva = require("../models/reserva");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

function findAll(req, res, next) {
  Reserva.find({}, (err, reservas) => {
    if (err) next(err);
    res.send(reservas);
  });
}

function findById(req, res, next) {
  let id = req.params.id;
  Reserva.findById(id, (err, reserva) => {
    if (err) next(err);
    res.send(reserva);
  });
}

function create(req, res, next) {
  let newReserva = new Reserva({
    celda: req.body.celda,
    usuario: req.body.usuario,
    fecha: req.body.fecha
  });
  newReserva.save((err, reserva) => {
    if (err) next(err);
    res.send(reserva);
  });
}

function deleteById(req, res, next) {
  let id = req.params.id;
  Reserva.findOneAndDelete(id, (err, reserva) => {
    if (err) next(err);
    res.send(reserva);
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
