import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { MapView, Location, Permissions, Constants, Marker } from "expo";
import constantes from "../api/constants";
import axios from "axios";

export default class ZonasView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      location: {
        latitude: 6.246219,
        longitude: -75.573044
      }
    };
  }

  componentDidMount() {
    this.getCurrentPos();
    this.fetchMarkerData();
  }

  static navigationOptions = {
    title: "Zonas"
  };

  getCurrentPos() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "La localización no funciona en un emulador"
      });
    } else {
      this._getLocationAsync();
    }
  }

  fetchMarkerData() {
    return axios
      .get(`${constantes.apiUrl}/zona/all`)
      .then(response => {
        let markers = response.data;
        markers.push();
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permiso denegado a la ubicación"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
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
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 6.246219,
          longitude: -75.573044,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <View>
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
          <MapView.Marker
            key={"house"}
            coordinate={this.state.location}
            title="Posición Actual"
            description=""
            image={require("../../assets/you.png")}
          />
        </View>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF"
  }
});
