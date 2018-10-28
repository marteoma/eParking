const ZonaParqueo = require("../models/zonaParqueo");

function findAll(req, res) {
  ZonaParqueo.find({}, (err, data) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!data)
      return res
        .status(404)
        .send({ message: "No se encontraron zonas de parqueo" });

    res.status(200).send(data);
  });
}

function findById(req, res) {
  let id = req.params.id;
  ZonaParqueo.findById(id, (err, zona) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!zona) return res.status(404).send({ message: `La zona no existe` });

    res.status(200).send({ zona });
  });
}

function create(req, res) {
  const newZonaParqueo = new ZonaParqueo({
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion
  });
  newZonaParqueo.save((err, newZone) => {
    if (err)
      res
        .status(500)
        .send({ message: `Error al salvar en la base de datos: ${err} ` });

    res.status(200).send({ newZone });
  });
}

function updateNovedades(req, res) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndUpdate(
    id,
    { $push: { novedades: req.body.novedad } },
    { new: true, upsert: true },
    (err, zona) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!zona) return res.status(404).send({ message: `La zona no existe` });

      res.status(200).send({ zona });
    }
  );
}

function deleteById(req, res) {
  let id = req.params.id;
  ZonaParqueo.findByIdAndDelete(id, (err, zona) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!zona) return res.status(404).send({ message: `La zona no existe` });

    res.status(200).send({ zona });
  });
}

module.exports = {
  findAll,
  findById,
  create,
  updateNovedades,
  deleteById
};
