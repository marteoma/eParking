const Reserva = require("../models/reserva");
const CeldaController = require("./celda");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

//Probado
function findAll(req, res, next) {
  Reserva.find({}, (err, reservas) => {
    if (err) next(err);

    if (!reservas || !reservas.length)
      next(new Error("No se encontraron reservas"));
    else res.send(reservas);
  });
}

//Probada
function findById(req, res, next) {
  let id = req.params.id;
  Reserva.findById(id, (err, reserva) => {
    if (err) next(err);

    if (!reserva) next(new Error("La reserva no se encontró"));
    else res.send(reserva);
  });
}

//Probada
function create(req, res, next) {
  let zona = req.body.zona;
  let celda = req.body.celda;
  let usuario = req.body.usuario;
  CeldaController.getCeldaByData(zona, celda)
    .then(celda => {
      const newReserva = new Reserva({
        celda: celda._id,
        usuario: usuario
      });
      newReserva.save((err, reserva) => {
        if (err) next(err);

        if (!reserva)
          next(new Error("La reserva no se guardó satisfactoriamente"));
        else {
          CeldaController.changeEstado(celda._id, "reservado")
            .then(celda => {
              res.send({ reserva, celda });
            })
            .catch(err => {
              next(err);
            });
        }
      });
    })
    .catch(err => {
      next(err);
    });
}

function deleteById(req, res, next) {
  let id = req.params.id;
  Reserva.findOneAndDelete(id, (err, reserva) => {
    if (err) next(err);

    if (!reserva) next(new Error("La reserva no se encontró"));
    else {
      {
        CeldaController.changeEstado(id, "disponible")
          .then(celda => {
            res.send({ reserva, celda });
          })
          .catch(err => {
            next(err);
          });
      }
    }
  });
}

//Probada
function terminarReserva(req, res, next) {
  let id = req.params.id;
  Reserva.findByIdAndUpdate(
    id,
    { activa: false },
    { new: true },
    (err, reserva) => {
      if (err) next(err);

      if (!reserva) next(new Error("La reserva no se encontró"));
      else {
        CeldaController.changeEstado(id, "disponible")
          .then(celda => {
            res.send({ reserva, celda });
          })
          .catch(err => {
            next(err);
          });
      }
    }
  );
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  terminarReserva
};
