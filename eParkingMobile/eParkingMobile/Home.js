import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

//library imports
import { Icon, Button, Container, Header, Content, Left } from 'native-base'

//custom components imports 
import CustomHeader from './Components/CustomHeader'

export class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/DrawerIcons/home.png')}
        style={styles.icon}
      />
    ),
  })

  render() {
    return (

      <Container>

        <CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

        <Content
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Button
            onPress={() => this.props.navigation.navigate('Settings')} full>
            <Text style={{ color: 'white' }}>Go To Settings Screen</Text>
          </Button>
        </Content>

      </Container>

    )
  }

}
    
export default Home;

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
      width: 24,
      height: 24,
    },
    buttonText: {
      padding: 20,
      color: 'white'
    }
  });