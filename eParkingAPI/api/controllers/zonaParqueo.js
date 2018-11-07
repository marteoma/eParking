const ZonaParqueo = require("../models/zonaParqueo");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

function findAll(req, res, next) {
  ZonaParqueo.find({}, (err, zonas) => {
    if (err) next(err);
    res.send(zonas);
  });
}

function findById(req, res, next) {
  let id = req.params.id;
  ZonaParqueo.findById(id, (err, zona) => {
    if (err) next(err);
    res.send(zona);
  });
}

function create(req, res, next) {
  const newZonaParqueo = new ZonaParqueo({
    nombre: req.body.nombre.toLowerCase().replace(" ", "_"),
    ubicacion: req.body.ubicacion
  });
  newZonaParqueo.save((err, zona) => {
    if (err) next(err);
    res.send(zona);
  });
}

function deleteById(req, res, next) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndDelete(id, (err, zona) => {
    if (err) next(err);
    res.send(zona);
  });
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

function findByNombre(req, res, next) {
  let nombre = req.query.nombre;
  ZonaParqueo.find({ nombre }, (err, zona) => {
    if (err) next(err);
    res.send(zona);
  });
}

function getCeldasByNombre(req, res, next) {
  let nombre = req.query.nombre;
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
        celdas: 1
      }
    }
  ]).exec((err, celdas) => {
    if (err) next(err);
    res.send(celdas);
  });
}

/**
 * Devuele una promesa con el id de la celda buscada
 * @param {String} nombre Nombre de la zona que estoy buscando
 */
function getIdByNombre(nombre) {
  return new Promise((resolve, reject) => {
    ZonaParqueo.find({ nombre }, { _id: 1 }, (err, id) => {
      if (err) reject(err);
      else resolve(id[0]._id);
    });
  });
}

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  findByNombre,
  getCeldasByNombre,
  getIdByNombre
};
