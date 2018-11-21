import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class ZonaItem extends Component {
  getStyle(estado) {
    switch (estado) {
      case "reservado":
        return styles.reservado;
      case "disponible":
        return styles.disponible;
      case "novedad":
        return styles.novedad;
      case "ocupado":
        return styles.ocupado;
    }
  }

  render() {
    return (
      <View style={[styles.wrapper, this.getStyle(this.props.celda.estado)]}>
        <Text style={styles.item_main}>{this.props.celda.codigo}</Text>
        <Text style={styles.item_sub}>{this.props.celda.estado}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_main: {
    color: "#000",
    fontSize: 20,
    textAlign: "center"
  },
  item_sub: {
    color: "#000",
    fontSize: 15,
    textAlign: "center"
  },
  wrapper: {
    padding: 20,
    flex: 1,
    margin: 2
  },
  reservado: {
    backgroundColor: "#cf0a29"
  },
  disponible: {
    backgroundColor: "#25b200"
  },
  ocupado: {
    backgroundColor: "#7802ee"
  },
  novedad: {
    backgroundColor: "#efdb00"
  }
});
