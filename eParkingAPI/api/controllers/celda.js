const Celda = require("../models/celda");
const utils = require("../../handlers/utils");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

function findAll(req, res) {
  Celda.find({}, (err, celdas) => {
    utils.getResponse(res, err, celdas);
  });
}

function findById(req, res) {
  let id = req.params.id;
  Celda.findById(id, (err, celda) => {
    utils.getResponse(res, err, celda);
  });
}

function create(req, res) {
  let newCelda = new Celda({
    codigo: req.body.codigo,
    zona: req.body.zona
  });
  newCelda.save((err, celda) => {
    utils.simpleResponse(res, err, celda);
  });
}

function deleteById(req, res) {
  let id = req.params.id;
  Celda.findOneAndDelete(id, (err, celda) => {
    utils.getResponse(res, err, celda);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  deleteById
};
