import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class ZonaItem extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.item_main}>
          {this.props.zona.nombre.toUpperCase().replace(/_/g, " ")}
        </Text>
        <Text style={styles.item_sub}>{this.props.zona.ubicacion}</Text>
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
    color: "#AAA",
    fontSize: 15,
    textAlign: "center"
  },
  wrapper: {
    padding: 20,
    flex: 1
  }
});
