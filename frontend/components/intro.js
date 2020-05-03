import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LoginScreen from './login.js'

const slides = [
  {
    key: '1',
    title: 'Selection',
    text: 'Pick a restaurant and select your food',
    image: require('../images/1.png'),
    backgroundColor: '#000',
  },
  // {
  //   key: '2',
  //   title: 'Payment',
  //   text: 'Enter your address and select a payment option',
  //   image: require('../images/2.png'),
  //   backgroundColor: '#000',
  // },
  // {
  //   key: '3',
  //   title: 'Delivered',
  //   text: 'The restaurant will deliver your food right at your doorstep.',
  //   image: require('../images/3.png'),
  //   backgroundColor: '#000',
  // }
];

function intro(props) {

 const { setCurrentStep } = props;
 const updateUser = props.updateUser;

  _renderItem = ({ item }) => {
    return (
      <View key={item.key} style={styles.slide}>
        <Image source={item.image} style={{width:"60%",height:"40%"}}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    props.navigation.navigate("LoginScreen");
  }

/*if (state.showRealApp) {
      return (<LoginScreen />);
    } else {*/
      return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}/>;


}

export default intro;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
slide: {
    flex: 1,
    alignItems: 'center',
	padding:'15%',
    justifyContent: 'center',
    backgroundColor: 'purple',
	color: 'red',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});
