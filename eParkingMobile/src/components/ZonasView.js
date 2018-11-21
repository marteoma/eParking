import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { MapView } from "expo";
import constantes from "../api/constants";
import axios from "axios";

export default class ZonasView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  static navigationOptions = {
    title: "Zonas"
  };

  fetchMarkerData() {
    return axios
      .get(`${constantes.apiUrl}/zona/all`)
      .then(response => {
        this.setState({
          isLoading: false,
          markers: response.data
        });
      })
      .catch(error => {
        Alert.alert("Ha ocurrido un error");
      });
  }

  onPress(zona) {
    this.props.navigation.navigate("Celdas", { zona });
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
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 6.246219,
          longitude: -75.573044,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => {
              const coords = {
                latitude: marker.lat,
                longitude: marker.lon
              };

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.nombre.toUpperCase().replace(/_/g, " ")}
                  description={marker.ubicacion}
                  onPress={() => this.onPress(marker.nombre)}
                />
              );
            })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF"
  }
});
