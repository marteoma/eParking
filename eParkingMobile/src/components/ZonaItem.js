import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";

export default class ZonaItem extends Component {
  _onPressButton() {
    Alert.alert("H");
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPressButton} underlayColor="white">
        <View style={styles.wrapper}>
          <Text style={styles.item}>
            {this.props.name.toUpperCase().replace(/_/g, " ")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    color: "#000",
    padding: 20,
    fontSize: 20
  },
  wrapper: {
    borderWidth: 2
  }
});
