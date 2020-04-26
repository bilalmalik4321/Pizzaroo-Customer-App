import React, { Component, useState } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchablHighlight, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import styles from "./style";
import * as validations from './validations';
import { getUser, createUser } from './api';
import { TextField} from 'react-native-material-textfield';


function Login(props) {
  // console.log("props", props);


  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [returnError, setReturnError ] = useState('');
  const { error_signup } = props.errors;

  const onCreateUser = async () => {

    const { email, password } = props.user;
    const res = await createUser({
      email,
      password
    });
    // console.log("result-----", res);
    const { result , error } = res;
    if(result) {
      setModalVisible(false);
    } else {
      setReturnError(error);
    }
  }


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
              { error_signup && error_signup.email  && 
                <Text> {error_signup.email }</Text>
              }
              {
                returnError !== '' && 
                <Text> {returnError}</Text>
              }
              <TextInput 
                placeholder="Password" 
                placeholderColor="#c4c3cb" 
                style={styles.signupFormTextInput} 
                secureTextEntry={true}
                onChangeText={text => props.updateUser({password: text})}
                
              />
              { error_signup && error_signup.password && 
                <Text> {error_signup.password }</Text>
              }
              <TextInput 
                placeholder="Repeat Password" 
                placeholderColor="#c4c3cb" 
                style={styles.signupFormTextInput} 
                secureTextEntry={true}
                onChangeText={text => props.updateUser({repeatPassword: text})}
                
              />
              { error_signup && error_signup.repeatPassword && 
                <Text> {error_signup.repeatPassword }</Text>
              }
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
                  setReturnError('');
                  const errors = validations.signup(props);
                  console.log("errors---", errors);
                  if(Object.keys(errors).length === 0 && props.user.isAccepted) {
                    console.log('false');
                    onCreateUser();
                  }
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

export default subscribe()(Login);
