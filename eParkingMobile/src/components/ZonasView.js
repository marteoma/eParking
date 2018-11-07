import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from "react-native";
import ZonaItem from "./ZonaItem";
import constantes from "../api/constants";
import axios from "axios";
import publicIP from 'react-native-public-ip';

export default class ZonasView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
 
  componentDidMount() {
    return axios
      .get(`${constantes.apiUrl}/zona`)
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
    here = 0;
  publicIP()
    .then(ip => {
      console.log(ip);
      here = ip;
      // '47.122.71.234'
    })
    .catch(error => {
      console.log(error);
      // 'Unable to get IP address.'
  });

    if (this.state.isLoading) {
      return (
         
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />        
          <Text>${here}</Text> 
        </View>
      );
    }

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
