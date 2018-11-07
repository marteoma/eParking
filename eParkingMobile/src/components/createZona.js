import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import api from "../api/index";
import constantes from "../api/constants";
import axios from "axios";
import publicIP from 'react-native-public-ip';

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
