/**
 * Hace una petición de obtención de datos y envía su resultado o su error
 * @param {any} res
 * @param {err} err
 * @param {any} data
 */
function getResponse(res, err, data) {
  if (err)
    return res
      .status(500)
      .send({ message: `Error al realizar la petición: ${err}` });
  if (!data)
    return res.status(404).send({ message: "No se encontraron datos" });

  res.status(200).send(data);
}

/**
 * Hace una petición de salvado de datos sin retorno de estos, y envía los datos almacenados
 * @param {any} res
 * @param {err} err
 * @param {any} data
 */
function simpleResponse(res, err, data) {
  if (err)
    res
      .status(500)
      .send({ message: `Error al salvar en la base de datos: ${err} ` });
  res.status(200).send({ data });
}

module.exports = {
  getResponse,
  simpleResponse
};
