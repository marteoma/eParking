import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import ZonaItem from "./ZonaItem";
import constantes from "../api/constants";
import axios from "axios";

export default class ZonasView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    // this._onPressButton = this._onPressButton.bind(this)
  }

  componentDidMount() {
    return axios
      .get(`${constantes.apiUrl}/zona/all`)
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onPressButton(zona) {
    this.props.navigation.navigate("Celdas", { zona: "parque_norte" });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this._onPressButton(item.nombre)}
              underlayColor="white"
            >
              <ZonaItem zona={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
