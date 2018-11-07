const ZonaParqueo = require("../models/zonaParqueo");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

//Probada
function findAll(req, res, next) {
  ZonaParqueo.find({}, (err, zonas) => {
    if (err) next(err);

    if (!zonas || !zonas.length) next(new Error("No se encontraron datos"));
    else res.send(zonas);
  });
}

//Proaba
function findById(req, res, next) {
  let id = req.params.id;
  ZonaParqueo.findById(id, (err, zona) => {
    if (err) next(err);

    if (!zona) next(new Error("No se encontraron zonas con ese id"));
    else res.send(zona);
  });
}

//Probada
function create(req, res, next) {
  const newZonaParqueo = new ZonaParqueo({
    nombre: req.body.nombre.toLowerCase().replace(/ /g, "_"),
    ubicacion: req.body.ubicacion
  });
  newZonaParqueo.save((err, zona) => {
    if (err) next(err);

    if (!zona) next(new Error("Ocurrió un error al salvar la zona"));
    else res.send(zona);
  });
}

//Probada
function deleteById(req, res, next) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndDelete(id, (err, zona) => {
    if (err) next(err);

    if (!zona)
      next(new Error("No se encontraron zonas con ese id para borrar"));
    else res.send(zona);
  });
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

//Probada
function findByNombre(req, res, next) {
  let nombre = req.query.nombre;
  ZonaParqueo.find({ nombre }, (err, zona) => {
    if (err) next(err);

    if (!zona) next(new Error("No se encontraron zonas con ese nombre"));
    else res.send(zona);
  });
}

//Probada
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
  ]).exec((err, result) => {
    if (!result || !result.length) {
      next(new Error("No se encontró una zona con ese nombre"));
    } else {
      const celdas = result[0].celdas;
      if (err) next(err);

      if (!celdas || !celdas.length)
        next(new Error("No se encontraron celdas para la zona"));
      else res.send(celdas);
    }
  });
}

/**
 * Devuele una promesa con el id de la celda buscada
 * @param {String} nombre Nombre de la zona que estoy buscando
 */
function getIdByNombre(nombre) {
  return new Promise((resolve, reject) => {
    ZonaParqueo.find({ nombre }, { _id: 1 }, (err, zonas) => {
      if (err) reject(err);

      if (!zonas || !zonas.length)
        reject(new Error("No se econctró el id de esa zona"));
      else resolve(zonas[0]._id);
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
