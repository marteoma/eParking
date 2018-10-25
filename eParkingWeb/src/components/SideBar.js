import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Tooltip from "@material-ui/core/Tooltip";
import ListaPaquetes from "./ListaPaquetes";
import Zoom from "@material-ui/core/Zoom";
import { iconosProyectos } from "../utils/iconos";
import PACKAGE from "../../package.json";

const drawerWidth = 300;

const API_URL = PACKAGE.config.api[process.env.NODE_ENV];

const styles = theme => ({
  toolbar: {
    paddingRight: 20
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  buttonActive: {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }
});

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      proyectos: [],
      paquetes: [],
      currentProject: {}
    };

    this.getProyectos = this.getProyectos.bind(this);
    this.getPaquetes = this.getPaquetes.bind(this);
    this.showProject = this.showProject.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  componentDidMount() {
    this.getProyectos();
    this.getPaquetes();
  }

  getProyectos() {
    axios.get(`${API_URL}/proyectos/`).then(res => {
      const { data } = res;

      this.setState({
        proyectos: data
      });
    });
  }

  getPaquetes() {
    axios
      .get(`${API_URL}/proyectos/5bbbfcf4225d3d0015b172d7/paquetes`)
      .then(res => {
        const { data } = res;

        this.setState({
          currentProject: { nombre: "eParking" },
          paquetes: data
        });
      });
  }

  showProject(projectId, nombreProyecto) {
    axios.get(`${API_URL}/proyectos/${projectId}/paquetes`).then(res => {
      const { data } = res;
      const currentProject = this.state.proyectos.filter(
        p => p.nombre === nombreProyecto
      )[0];

      this.setState({
        currentProject,
        paquetes: data
      });
    });
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  setProjectIcon(icono) {
    let Proyecto = iconosProyectos[icono];
    return <Proyecto />;
  }

  isCurrentProject(nombreProyecto) {
    return nombreProyecto === this.state.currentProject.nombre;
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {this.state.currentProject.nombre}
            </Typography>
            {this.state.proyectos.map(proyecto => (
              <Tooltip
                TransitionComponent={Zoom}
                title={proyecto.nombre}
                key={proyecto._id}
                onClick={() => {
                  this.showProject(proyecto._id, proyecto.nombre);
                }}
                component={Link}
                to={{
                  pathname: `/proyecto`,
                  state: { proyecto }
                }}
              >
                <IconButton
                  aria-label={proyecto.nombre}
                  color="inherit"
                  className={classNames(
                    this.isCurrentProject(proyecto.nombre) &&
                      classes.buttonActive
                  )}
                >
                  {this.setProjectIcon(proyecto.icono)}
                </IconButton>
              </Tooltip>
            ))}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListaPaquetes paquetes={this.state.paquetes} />
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
