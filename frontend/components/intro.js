import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LoginScreen from './login.js'

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   
    backgroundColor: '#000',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
   
    backgroundColor: '#000',
  },
  {
    key: 3,
    title: 'Title 3',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    
    backgroundColor: '#000',
  }
];

function intro(props) {

 const { setCurrentStep } = props;
 const updateUser = props.updateUser;

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
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
    backgroundColor: 'orange',
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