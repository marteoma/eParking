import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Icon, Button } from 'native-base'
import CustomHeader from './Components/CustomHeader'

export class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerIcon:
        <Image
            source={require('./assets/DrawerIcons/settings.png')}
            style={[styles.icon]}
        />

})

render() {
  return (

  <Container>

      <CustomHeader
          title="Settings"
          drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
      />
      <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Button
              full
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={{ color: 'white' }}>Go to Home screen</Text>
          </Button>
      </Content>
  </Container>
)
}

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },    
    button: {
      marginBottom: 30,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    icon: {
      height: 24,
      width: 24
   },
    buttonText: {
      padding: 20,
      color: 'white'
    }
  });

export default Settings;