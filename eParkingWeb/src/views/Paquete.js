import React from "react";
import SimpleTable from "../components/SimpleTable";
import Typography from "@material-ui/core/Typography";

const Paquete = ({ location }) => {
  const { nombre, historiasDeUsuario } = location.state.paquete;

  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Paquete {nombre}
      </Typography>

      <Typography variant="h5" gutterBottom component="h2">
        Historias de Usuario
      </Typography>
      <div>
        <SimpleTable lista={historiasDeUsuario} columns={["nombre"]} />
      </div>
    </div>
  );
};

export default Paquete;
