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
import TextField from "@material-ui/core/TextField";
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
const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

class ReportarNovedad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zona: "",
      celda: "",
      novedad: "",
      zonas: [],
      celdas: [],
      id: "",
      open: false
    };

    this.getZonas = this.getZonas.bind(this);
    this.crearNovedad = this.crearNovedad.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.getZonas();
    console.log(this.state.zonas);
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

  getCeldas() {}

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
                {/* <InputLabel htmlFor="zona">Zona</InputLabel> */}
                {/* <Input
                  id="zona"
                  name="zona"
                  autoFocus
                  value={this.state.zona}
                  onChange={e => this.setState({ zona: e.target.value })}
                
                /> */}

                <TextField
                  id="zona1"
                  select
                  className={classes.textField}
                  value={this.state.zona}
                  onChange={this.handleChange("zona")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Zona*"
                >
                  {this.state.zonas.map(option => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.ubicacion}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                {/* <InputLabel htmlFor="celda">Celda</InputLabel> */}
                {/* <Input
                  id="celda"
                  name="celda"
                  value={this.state.celda}
                  onChange={e => this.setState({ celda: e.target.value })}
                /> */}
                {
                  <TextField
                    id="celda1"
                    select
                    className={classes.textField}
                    value={this.state.celda}
                    onChange={this.handleChange("celda")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Celda*"
                  >
                    {this.state.celdas.map(option => (
                      <MenuItem key={option.codigo} value={option.codigo}>
                        {option.codigo}
                      </MenuItem>
                    ))}
                  </TextField>
                }
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
