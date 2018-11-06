// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId
const ZonaParqueo = require("../models/zonaParqueo");
const utils = require("../../handlers/utils");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

function findAll(req, res) {
  ZonaParqueo.find({}, (err, zonas) => {
    utils.getResponse(res, err, zonas);
  });
}

function findById(req, res) {
  let id = req.params.id;
  ZonaParqueo.findById(id, (err, zona) => {
    utils.getResponse(res, err, zona);
  });
}

function create(req, res) {
  const newZonaParqueo = new ZonaParqueo({
    nombre: req.body.nombre.toLowerCase().replace(" ", "_"),
    ubicacion: req.body.ubicacion
  });
  newZonaParqueo.save((err, zona) => {
    utils.simpleResponse(res, err, zona);
  });
}

function deleteById(req, res) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndDelete(id, (err, zona) => {
    utils.getResponse(res, err, zona);
  });
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

function updateNovedades(req, res) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndUpdate(
    id,
    { $push: { novedades: req.body.novedad } },
    { new: true, upsert: true },
    (err, zona) => {
      utils.getResponse(res, err, zona);
    }
  );
}

function findByNombre(req, res) {
  let nombre = req.query.nombre;
  ZonaParqueo.find({ nombre }, (err, zona) => {
    utils.getResponse(res, err, zona);
  });
}

function getCeldasByNombre(req, res) {
  let nombre = req.params.nombre;
  ZonaParqueo.aggregate([
    {
      $lookup: {
        from: "ep_celdas",
        localField: "_id",
        foreignField: "zona",
        as: "celdas"
      }
    },
    {
      $match: {
        nombre: nombre
      }
    },
    {
      $project: {
        celdas: 1,
        _id: 0
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
  updateNovedades,
  findByNombre,
  getCeldasByNombre
};
