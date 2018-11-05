import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import api from "../api/index";
import constantes from "../api/constants";
import axios from "axios";

export default class createZona extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return axios
      .get(`${constantes.apiUrl}/zona`)
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data
        });
        console.log(responseJson.data);
      })
      .catch(error => {
        console.error(error);
      });
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
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nombre}</Text>
            </View>
          )}
          keyExtractor={({ nombre }, index) => nombre}
        />
      </View>
    );
  }
}
