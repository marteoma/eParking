import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "../../components/SimpleTable";
import Typography from "@material-ui/core/Typography";

import PACKAGE from "../../../package.json";

const API_URL = PACKAGE.config.api[process.env.NODE_ENV];

class VerZonas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zonas: []
    };

    this.getZonas = this.getZonas.bind(this);
  }

  componentDidMount() {
    this.getZonas();
  }

  getZonas() {
    axios.get(`${API_URL}/zonaParqueo/`).then(res => {
      const { data } = res;

      this.setState({
        zonas: data
      });
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Zonas
        </Typography>

        <div>
          <SimpleTable
            lista={this.state.zonas}
            columns={["nombre", "ubicacion"]}
          />
        </div>
      </div>
    );
  }
}

export default VerZonas;
