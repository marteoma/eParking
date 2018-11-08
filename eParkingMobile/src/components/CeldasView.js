import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text
} from "react-native";
import CeldaItem from "./CeldaItem";
import constantes from "../api/constants";
import axios from "axios";

export default class CeldasView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const zona = navigation.getParam("zona", "NO-ID");

    return axios
      .get(`${constantes.apiUrl}/zona/celdas/all?nombre=${zona}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          isLoading: false,
          dataSource: response.data
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          dataSource: ["No se encontraron celdas disponibles"]
        });
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
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <CeldaItem celda={item} />}
          keyExtractor={item => item._id}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF"
  }
});
