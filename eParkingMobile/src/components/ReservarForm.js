import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert
} from "react-native";
import constantes from "../api/constants";
import axios from "axios";
import { Notifications, Constants, Permissions } from "expo";
import t from "tcomb-form-native";

const Form = t.form.Form;

const User = t.struct({
  usuario: t.String
});

export default class ReservarForm extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Reservar"
  };

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  handleSubmit = () => {
    const { navigation } = this.props;
    const celda = navigation.getParam("celda", "NO-ID");
    const zona = navigation.getParam("zona", "NO-ID");
    const value = this.refs.form.getValue();
    const post = {
      zona,
      celda,
      usuario: value.usuario
    };

    if (value) {
      // if validation fails, value will be null
      axios
        .post(`${constantes.apiUrl}/reserva`, post)
        .then(result => {
          console.log("WORKED", result.data);
          Alert.alert("Reserva exitosa");

          let notification = {
            title: "Reserva Pendiente",
            body: "El tiempo de tu reserva está a punto de terminar",
            ios: {
              sound: true
            },
            android: {
              sound: true,
              priority: "high", // (optional) (min | low | high | max)
              vibrate: true
            }
          };
          let schedule = {
            time: new Date().getTime() + 10000
          };
          Notifications.scheduleLocalNotificationAsync(notification, schedule);

          navigation.navigate("Zonas");
        })
        .catch(err => {
          Alert.alert("Ha ocurrido un error", err);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form type={User} ref="form" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
