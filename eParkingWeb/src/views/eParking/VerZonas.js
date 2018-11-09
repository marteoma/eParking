import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "../../components/SimpleTable";
import Typography from "@material-ui/core/Typography";

import KEY from "./config";

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
    axios.get(`${KEY.apiURL}/zona/all`).then(res => {
      const { data } = res;
      console.log(res);
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
