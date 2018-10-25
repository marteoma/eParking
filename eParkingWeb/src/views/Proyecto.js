import React from "react";
import Typography from "@material-ui/core/Typography";

const getProyecto = props => {
  if (props.location.state) {
    return props.location.state.proyecto;
  } else {
    return {
      nombre: "eParking",
      descripcion: "Proyecto eParking"
    };
  }
};

const Proyecto = props => {
  const { nombre, descripcion } = getProyecto(props);
  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Proyecto {nombre}
      </Typography>

      <div>
        <Typography variant="body1">{descripcion}</Typography>
      </div>
    </div>
  );
};

export default Proyecto;
