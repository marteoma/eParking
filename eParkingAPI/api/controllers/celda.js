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

function findByZonaAndNombre(req, res) {
  let zona = req.query.zona;
  let nombre = req.query.nombre;
  Celda.aggregate([
    {
      $lookup: {
        from: "ep_zonasParqueo",
        localField: "zona",
        foreignField: "_id",
        as: "zona_obj"
      }
    },
    {
      $match: {
        codigo: nombre,
        "zona_obj.0.nombre": zona
      }
    },
    {
      $project: {
        codigo: 1
      }
    }
  ]).exec((err, celdas) => {
    utils.getResponse(res, err, celdas);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  findByZonaAndNombre
};
