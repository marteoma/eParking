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
import { setJSExceptionHandler } from "react-native-exception-handler";
import constantes from "../api/constants";
import axios from "axios";

const exceptionhandler = (error, isFatal) => {
  if (isFatal) {
    Alert.alert(
      "Unexpected error occurred",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
        We will need to restart the app.
        `,
      [
        {
          text: "Restart",
          onPress: () => {
            RNRestart.Restart();
          }
        }
      ]
    );
  } else {
    Alert.alert("No se encontraron celdas disponibles");
  }
};
setJSExceptionHandler(exceptionhandler, false);

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
        console.error(error);
      });
  }

  _onPressButton(celda) {
    const { navigation } = this.props;
    const zona = navigation.getParam("zona", "NO-ID");
    navigation.navigate("Reservar", { zona, celda });
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
              onPress={() => this._onPressButton(item.codigo)}
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
