import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "./MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const getUrl = nombre => {
  let url = "";
  switch (nombre) {
    default:
      url = `/historia/${nombre}`;
      break;
    case "Gestionar zona de parqueo":
      url = "/eParking/gestionarZona";
      break;
    case "Ver zonas de parqueo":
      url = "/eParking/verZonas";
      break;
  }
  return url;
};

const populateHistorias = historiasDeUsuario => {
  return historiasDeUsuario.map(historia => (
    <ListItem
      button
      key={historia._id}
      component={Link}
      to={getUrl(historia.nombre)}
    >
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText inset primary={historia.nombre} />
    </ListItem>
  ));
};

const ListaPaquetes = ({ paquetes }) => {
  return (
    <div>
      {paquetes.map(paquete => (
        <MenuItem paquete={paquete} key={paquete._id}>
          {populateHistorias(paquete.historiasDeUsuario)}
        </MenuItem>
      ))}
    </div>
  );
};

export default ListaPaquetes;
