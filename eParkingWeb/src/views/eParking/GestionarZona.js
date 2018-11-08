import React, { Fragment, Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import PACKAGE from "../../../package.json";
import KEY from "./config";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class GestionarZona extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      ubicacion: "",
      open: false
    };

    this.crearZona = this.crearZona.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  crearZona(e) {
    e.preventDefault();

    axios
      .post(`${KEY.apiURL}/zona/`, {
        nombre: this.state.nombre,
        ubicacion: this.state.ubicacion
      })
      .then(res => {
        this.setState({
          nombre: "",
          ubicacion: "",
          open: true
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.open}
          onClose={this.handleClose}
          message={<span id="message-id">Zona creada con exito</span>}
        />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Zona
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input
                  id="name"
                  name="nombre"
                  autoFocus
                  value={this.state.nombre}
                  onChange={e => this.setState({ nombre: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="ubicacion">Ubicación</InputLabel>
                <Input
                  id="ubicacion"
                  name="ubicacion"
                  value={this.state.ubicacion}
                  onChange={e => this.setState({ ubicacion: e.target.value })}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.crearZona}
              >
                Crear Zona
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

GestionarZona.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GestionarZona);
