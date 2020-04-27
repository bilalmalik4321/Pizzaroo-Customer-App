import React, { Component, useState } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchablHighlight, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';


function login(props) {

  const { setCurrentStep } = props;
 const updateUser = props.updateUser;

const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);

	
//const { modalVisible } = state;

    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>

          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Welcome</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => {props.navigation.navigate("Restaurants");}}//onLoginPress
              title="Login"
            />
            <Divider style={{ backgroundColor: 'purple', padding:1, margin:'10%' }} />
		<Text style={{textAlign:'center', fontSize: 20}}>   New here?</Text>
		<Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
		setModalVisible(false);
          }}
        >
          <View style={[styles.centeredView, state.modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
          <View style={styles.modalView}>
            <Text style={styles.logoText}>Sign Up</Text>
		<TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
            	<TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true}/>
		<TextInput placeholder="Repeat Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true}/>
		<CheckBox
  			center
 			 title='I have read and I accept the terms and conditions'
				style={styles.signupFormcheckbox}
 			 checkedIcon='dot-circle-o'
  			uncheckedIcon='circle-o'
  			checked={state.checked}
			onPress={() => setState({checked: !state.checked})}
		/>
		<Button
              buttonStyle={styles.registerButton}
              onPress={() => {
                  setModalVisible(false);
			console.log('register the user');
                }}
              title="Register"
            />
            
          </View>
        </View>
      </Modal>

            <Button
              buttonStyle={styles.signupButton}
              onPress={() => {
                  setModalVisible(true);
                }}
              title="Sign up"
            />
                
              
            
       
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );

  componentDidMount = () => {
  }

  componentWillUnmount = () => {
  };

  onLoginPress = () => {
	props.navigation.navigate("Restaurants");
  };

onsignupPress = () => {
	console.log('sign up procedures');
  };
  
  
}

export default login;