import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  YellowBox
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-contextual";
import { Avatar } from "react-native-elements";

import Restaurants from "./components/restaurant/restaurants";
import MenuScreen from "./components/restaurant/menu";
import accountScreen from "./components/account/setting";
import Introduction from "./components/intro";
import LoginScreen from "./components/account/login";
import ReviewOrderScreen from "./components/order/review";
import CheckoutScreen from "./components/order/checkout";
import store from './components/_shared/store';
import Location from './components/location/location';
import Address from './components/location/address';
import ChangePassword from './components/account/changePassword';
import ChangeEmail from './components/account/changeEmail';
import Orders from './components/order/orderHistory';
import StatusOrder from './components/order/status';
import Signup from './components/account/signup';
import ForgotPassword from './components/account/forgotPassword';
import Verify from './components/account/verifyMessage';
const AppNavigator = createStackNavigator(
  
{
    Verify: {
      screen: Verify,

      navigationOptions: {
        headerShown: false,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,

      navigationOptions: ({ navigation }) => ({
        title: 'Reset Password',
	    	headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
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

    Signup: {
      screen: Signup,

      navigationOptions: ({ navigation }) => ({
        title: 'Registration',
	    	headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
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
    Status: {
      screen: StatusOrder,

      navigationOptions: ({ navigation }) => ({
        title: 'Status',
	    	headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Orders")}
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
    Orders: {
      screen: Orders,

      navigationOptions: ({ navigation }) => ({
        title: 'Orders',
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
  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
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


