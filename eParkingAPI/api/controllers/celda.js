const Celda = require("../models/celda");
const Novedad = require("../models/novedad");
const ZonaController = require("./zonaParqueo");

/*********************************
 * Los métodos a continuación son de CRUD, tienen un funcionamiento igual
 * en todos los controladores y deberían dejarse
 *********************************/

//Probada
function findAll(req, res, next) {
  Celda.find({}, (err, celdas) => {
    if (err) next(err);
    if (!celdas || !celdas.length) next(new Error("No se encontraron datos"));
    else res.send(celdas);
  });
}

//Probada
function findById(req, res, next) {
  let id = req.params.id;
  Celda.findById(id, (err, celda) => {
    if (err) next(err);
    if (!celda) next(new Error("No se encontraron celdas para ese id"));
    else res.send(celda);
  });
}

//Probada
function createByZonaNombre(req, res, next) {
  ZonaController.getIdByNombre(req.body.zona)
    .then(id => {
      let newCelda = new Celda({
        codigo: req.body.codigo,
        zona: id
      });
      newCelda.save((err, celda) => {
        if (err) next(err);
        if (!celda) next(new Error("La celda no se salvó correctamente"));
        else res.send(celda);
      });
    })
    .catch(err => {
      next(err);
    });
}

//Probada
function deleteById(req, res, next) {
  let id = req.params.id;
  Celda.findByIdAndDelete(id, (err, celda) => {
    if (err) next(err);
    if (!celda) next(new Error("No se encontraron celdas con ese id"));
    else res.send(celda);
  });
}

/*********************************
 * Los métodos a continuación son específicos para este controlador.
 * Son creados según las funcionalidades de las aplicaciones
 *********************************/

/**
 * Obtiene una celda a partir de su zona y su nombre
 * @param {String} zona Nombre de la zona
 * @param {String} nombre Nombre de la celda
 */
function getCeldaByData(zona, nombre) {
  return new Promise((resolve, reject) => {
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
      if (err) reject(err);

      if (!celdas || !celdas.length)
        reject(new Error("No se encontró celda con esos datos"));
      else resolve(celdas[0]);
    });
  });
}

function changeEstado(id, estado) {
  return new Promise((resolve, reject) => {
    Celda.findByIdAndUpdate(id, { estado }, { new: true }, (err, celda) => {
      if (err) reject(err);
      //TODO: ARREGLAR FUNCIONAMIENTO CON TERMINAR RESERVA
      if (!celda) reject(new Error("No se actualizó correctamente"));
      else resolve(celda);
    });
  });
}

//Probada
function findByZonaAndNombre(req, res, next) {
  let zona = req.query.zona;
  let nombre = req.query.nombre;

  getCeldaByData(zona, nombre)
    .then(celda => {
      res.send(celda);
    })
    .catch(err => {
      next(err);
    });
}

//Probada
function changeNovedad(req, res, next) {
  ZonaController.getIdByNombre(req.body.zona)
    .then(id => {
      let query = { zona: id, codigo: req.body.nombre };
      let novedad = {
        descripcion: req.body.descripcion
      };
      Celda.findOneAndUpdate(
        query,
        { novedad, estado: "novedad" },
        { new: true },
        (err, celda) => {
          if (err) next(err);
          if (!celda)
            next(
              new Error("No se encontraron datos para actualizar la novedad")
            );
          else res.send(celda);
        }
      );
    })
    .catch(err => {
      next(err);
    });
}

//Probada
function deleteNovedad(req, res, next) {
  ZonaController.getIdByNombre(req.body.zona)
    .then(id => {
      let query = { zona: id, codigo: req.body.nombre };
      let novedad = {
        descripcion: "Sin novedades",
        activa: false
      };
      Celda.findOneAndUpdate(
        query,
        { novedad, estado: "disponible" },
        { new: true },
        (err, celda) => {
          if (err) next(err);
          if (!celda)
            next(new Error("No se encontraron datos para borrar novedad"));
          else res.send(celda);
        }
      );
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  findAll,
  findById,
  createByZonaNombre,
  deleteById,
  findByZonaAndNombre,
  changeNovedad,
  deleteNovedad,
  getCeldaByData,
  changeEstado
};
