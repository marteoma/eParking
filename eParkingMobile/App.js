import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import ZonasView from "./src/components/ZonasView";
import CeldasView from "./src/components/CeldasView";

const RootStack = createStackNavigator(
  {
    Zonas: ZonasView,
    Celdas: CeldasView
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
