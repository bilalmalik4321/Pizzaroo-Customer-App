import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Restaurants from "./components/restaurantScreen";
import MenuScreen from "./components/menuScreen";
import accountScreen from "./components/accountScreen";
import Introduction from "./components/intro";
import LoginScreen from "./components/login.js";
import backButton from "./images/left-chevron.png";
import { Avatar } from "react-native-elements";
import store from './shared_/store';
import { Provider } from "react-contextual";
const AppNavigator = createStackNavigator(
  {
    Introduction: {
      screen: Introduction,

      navigationOptions: {
        headerShown: false,
      },
    },

    LoginScreen: {
      screen: LoginScreen,

      navigationOptions: {
        headerShown: false,
      },
    },

    Restaurants: {
      screen: Restaurants,


      navigationOptions: ({ navigation }) => ({
        gestureEnabled: false,

        headerRight: () => (
          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => navigation.navigate("Account")}
            style={styles.userButton}
          />

        ),
        headerLeft: () => {
          null;
        },
      }),
    },

    Menu: {
      screen: MenuScreen,

      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Restaurants")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (

          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => navigation.navigate("Account")}
            style={styles.userButton}
          />
        ),
      }),
    },

    Account: {
      screen: accountScreen,

      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Restaurants")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>

        ),
      }),
    },

    Account: {
      screen: accountScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Restaurants")
            }
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        )
      }),
    }

  },

  {
    initialRouteName: "Introduction",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
  <Provider {...store}>
      <AppContainer />    
  </Provider> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    width: 22,
    height: 22,
    marginLeft: 15,
  },
  userButton: {
    width: 25,
    height: 25,
    marginRight: 15,
  },

});