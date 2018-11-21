import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
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
        Alert.alert("No hay celdas");
        navigation.navigate("Zonas");
      });
  }

  _onPressButton(celda, estado) {
    if (estado === "disponible") {
      const { navigation } = this.props;
      const zona = navigation.getParam("zona", "NO-ID");
      navigation.navigate("Reservar", { zona, celda });
    } else {
      Alert.alert("La celda no está disponible para reservar");
    }
  }

  static navigationOptions = {
    title: "Celdas"
  };

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
              onPress={() => this._onPressButton(item.codigo, item.estado)}
              underlayColor="white"
            >
              <CeldaItem celda={item} />
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
    backgroundColor: "#F5FCFF"
  }
});
