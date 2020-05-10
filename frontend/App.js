import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Restaurants from "./components/restaurant/restaurantScreen";
import MenuScreen from "./components/restaurant/menuScreen";
import accountScreen from "./components/account/accountScreen";
import Introduction from "./components/intro";
import LoginScreen from "./components/account/login.js";
import ReviewOrderScreen from "./components/order/order.js";
import CheckoutScreen from "./components/order/checkout.js";
import { Avatar } from "react-native-elements";
import store from './components/shared_/store';
import { Provider } from "react-contextual";
import Location from './components/location/location';
import Address from './components/location/address';
import ChangePassword from './components/account/changePassword';
import ChangeEmail from './components/account/changeEmail';
import ChangeProfile from './components/account/changeProfile'



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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
        headerRight: () => (

          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => navigation.navigate("Account")}
            style={styles.userButton}
          />
        ),
        headerLeft: () => {
			
        },
      }),
    },

    Menu: {
      screen: MenuScreen,

      navigationOptions: ({ navigation }) => ({
        title: `Menu`,
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
		headerTitleAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

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
