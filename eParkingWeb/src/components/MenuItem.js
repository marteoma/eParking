import React, { Component, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { iconosPaquetes } from "../utils/iconos";
import { Link } from "react-router-dom";

const setPackageIcon = icono => {
  let Paquete = iconosPaquetes[icono];
  return <Paquete />;
};

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { paquete, children } = this.props;
    const { nombre, icono } = paquete;
    const iconComponent = setPackageIcon(icono);
    return (
      <Fragment>
        <ListItem
          button
          onClick={this.handleClick}
          component={Link}
          to={{
            pathname: `/paquete`,
            state: { paquete }
          }}
        >
          <ListItemIcon>{iconComponent}</ListItemIcon>
          <ListItemText inset primary={nombre} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      </Fragment>
    );
  }
}
