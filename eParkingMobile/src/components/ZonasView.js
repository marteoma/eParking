import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from "react-native";
import ZonaItem from "./ZonaItem";
import constantes from "../api/constants";
import axios from "axios";

export default class ZonasView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
 
  componentDidMount() {
    return axios
      .get(`${constantes.apiUrl}/zona/all`)
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ZonaItem name={item.nombre} id={item._id} />
          )}
          keyExtractor={({ nombre }, index) => nombre}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20
  }
});
