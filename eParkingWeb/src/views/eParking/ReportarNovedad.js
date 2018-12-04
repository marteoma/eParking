import React, { Fragment, Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import KEY from "./config";
import Select from "@material-ui/core/Select";

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class ReportarNovedad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zona: "",
      celda: "",
      novedad: "",
      zonas: [],
      celdas: [],
      open: false
    };

    this.getZonas = this.getZonas.bind(this);
    this.getCeldas = this.getCeldas.bind(this);
    this.crearNovedad = this.crearNovedad.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getZonas();
  }

  componentDidUpdate() {
    this.getCeldas();
  }

  handleClose() {
    this.setState({ open: false });
  }

  crearNovedad(e) {
    e.preventDefault();
    let thisComponent = this;
    console.log(this);

    axios
      .put(`${KEY.apiURL}/novedad/`, {
        zona: this.state.zona,
        nombre: this.state.celda,
        descripcion: this.state.novedad
      })
      .then(res => {
        thisComponent.setState({
          zona: "",
          celda: "",
          novedad: "",
          open: true
        });
      });
  }

  getZonas() {
    axios.get(`${KEY.apiURL}/zona/all`).then(res => {
      const { data } = res;

      this.setState({
        zonas: data
      });
    });
  }

  getCeldas() {
    axios
      .get(`${KEY.apiURL}/zona/celdas/all?nombre=${this.state.zona}`)
      .then(res => {
        const { data } = res;

        this.setState({
          celdas: data
        });
      })
      .catch(err => {
        this.setState({
          celdas: []
        });
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.open}
          onClose={this.handleClose}
          message={<span id="message-id">Novedad reportada con exito</span>}
        />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Reportar novedad
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <Select
                  value={this.state.zona}
                  onChange={this.handleChange("zona")}
                  name="zona"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {this.state.zonas.map(zona => (
                    <MenuItem value={zona.nombre} key={zona._id}>
                      {zona.nombre.toUpperCase().replace(/_/g, " ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <Select
                  value={this.state.celda}
                  onChange={this.handleChange("celda")}
                  name="celda"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {this.state.celdas.map(zona => (
                    <MenuItem value={zona.codigo} key={zona._id}>
                      {zona.codigo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <Typography component="h5" variant="h5">
                  Descripcion de la novedad
                </Typography>
                <textarea
                  id="novedad"
                  name="novedad"
                  value={this.state.novedad}
                  onChange={e => this.setState({ novedad: e.target.value })}
                  class="mdc-text-field__input"
                  rows="8"
                  cols="40"
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.crearNovedad}
              >
                Crear Novedad
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ReportarNovedad);
