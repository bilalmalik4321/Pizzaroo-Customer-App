import React, { Component, useState } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchablHighlight, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import styles from "./style";
import * as validations from './validations';
import { getUser, createUser } from './api';



function Login(props) {
  console.log("props", props);
  // console.log("props--all", all);

  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);

  const { error_signup} = props.errors


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Welcome</Text>
                <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                <TextInput 
                  placeholder="Password" 
                  placeholderColor="#c4c3cb" 
                  style={styles.loginFormTextInput} 
                  secureTextEntry={true}
                  
                />
                  <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => {props.navigation.navigate("Restaurants");}}//onLoginPress
                  title="Login"
                  />
                  <Divider style={{ backgroundColor: 'orange', padding:1, margin:'10%' }} />
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
              <TextInput 
                placeholder="Email" 
                placeholderColor="#c4c3cb" 
                style={styles.signupFormTextInput} 
                onChangeText={text => props.updateUser({email: text})}
              />
              { error_signup.email && error_signup &&
              <h3 >{error_signup.email} </h3>
              
              }
              <TextInput 
                placeholder="Password" 
                placeholderColor="#c4c3cb" 
                style={styles.signupFormTextInput} 
                secureTextEntry={true}
                onChangeText={text => props.updateUser({password: text})}
                
              />
              <TextInput 
                placeholder="Repeat Password" 
                placeholderColor="#c4c3cb" 
                style={styles.signupFormTextInput} 
                secureTextEntry={true}
                onChangeText={text => props.updateUser({repeatPassword: text})}
                
              />
              <CheckBox
                center
                title='I have read and I accept the terms and conditions'
                style={styles.signupFormcheckbox}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.user.isAccepted}
                onPress={() => props.updateUser({isAccepted: !props.user.isAccepted})}
              />
              <Button
                buttonStyle={styles.registerButton}
                onPress={() => {
                  const errors = validations.signup(props);
          
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
}

export default Login;
