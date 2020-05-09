import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Restaurants from "./components/restaurantScreen";
import MenuScreen from "./components/menuScreen";
import accountScreen from "./components/accountScreen";
import Introduction from "./components/intro";
import LoginScreen from "./components/login.js";
import ReviewOrderScreen from "./components/order.js";
import CheckoutScreen from "./components/checkout.js";
import { Avatar } from "react-native-elements";
import store from './shared_/store';
import { Provider } from "react-contextual";
import Location from './components/location';
import Address from './components/address';
import ChangePassword from './components/changePassword';
import ChangeEmail from './components/changeEmail';
import ChangeProfile from './components/changeProfile'
// import Review from './components/review';

const AppNavigator = createStackNavigator(
  {
    // Review: {
    //   screen: Review,

    //   navigationOptions: ({ navigation }) => ({
    //     title: 'Address',
    //     headerLeft: () => (
    //       <TouchableOpacity
    //         onPress={() => navigation.navigate("Restaurants")}
    //         activeOpacity={0.2}
    //       >
    //         <Image
    //           source={require("./images/left-chevron.png")}
    //           style={styles.backButton}
    //         />
    //       </TouchableOpacity>
    //     ),
    //   }),
    // },
    ChangeProfile: {
      screen: ChangeProfile,

      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
      })
    },
    ChangeEmail: {
      screen: ChangeEmail,

      navigationOptions: ({ navigation }) => ({
        title: 'Email',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
      })
    },

    ChangePassword: {
      screen: ChangePassword,

      navigationOptions: ({ navigation }) => ({
        title: 'Password',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
      })
    },
    Address: {
      screen: Address,

      navigationOptions: ({ navigation }) => ({
        title: 'Address',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Location")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
      })
    },
    selectLocationAddress: {
      screen: Address,

      navigationOptions: ({ navigation }) => ({
        title: 'Address',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SelectLocation")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ),
      })
    },
    SelectLocation : {
      screen: Location,

      navigationOptions: ({ navigation }) => ({
        title: 'Select Address',
        headerLeft: 
         () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            activeOpacity={0.2}
          >
           <Text style={{ fontWeight: 'bold', paddingLeft: 10}}>
              Checkout
           </Text>
          </TouchableOpacity>
     
         ),
        headerRight: () => {

        }

      })
    },
    Location: {
      screen: Location,

      navigationOptions: ({ navigation }) => ({
        title: 'Search Address',
        headerLeft: 
         () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Restaurants')}
            activeOpacity={0.2}
          >
           <Text style={{ fontWeight: 'bold', paddingLeft: 10}}>
            Home
           </Text>
          </TouchableOpacity>
     
         ),
        headerRight: () => {

        }
      })
    },
    
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
        title: `Menu`,
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
      //   headerRight: () => (

      //     <Avatar
      //       rounded
      //       icon={{ name: "user", type: "font-awesome" }}
      //       onPress={() => navigation.navigate("Account")}
      //       style={styles.userButton}
      //     />
      //   ),
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

    Review: {
      screen: ReviewOrderScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Review Order`,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Menu")}
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

    Checkout: {
      screen: CheckoutScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Checkout`,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Review")}
            activeOpacity={0.2}
          >
            <Image
              source={require("./images/left-chevron.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
        )   
     })
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
