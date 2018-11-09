import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import ZonasView from "./src/components/ZonasView";
import CeldasView from "./src/components/CeldasView";
import ReservarForm from "./src/components/ReservarForm";

const RootStack = createStackNavigator(
  {
    Zonas: ZonasView,
    Celdas: CeldasView,
    Reservar: ReservarForm
  },
  {
    initialRouteName: "Zonas"
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <RootStack />;
  }
}
