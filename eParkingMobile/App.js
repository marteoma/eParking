import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
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

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer />;
  }
}
