import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideBar from "./components/SideBar";
import Proyecto from "./views/Proyecto";
import Paquete from "./views/Paquete";
import GestionarZona from "./views/eParking/GestionarZona";
import VerZonas from "./views/eParking/VerZonas";

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <SideBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Route path="/proyecto" component={Proyecto} exact />
              <Route path="/paquete" component={Paquete} />
              <Route path="/eParking/gestionarZona" component={GestionarZona} />
              <Route path="/eParking/verZonas" component={VerZonas} />
            </main>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
