import React, { useState, useEffect } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchablHighlight, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import styles from "./style";
import * as validations from './validations';
import { getUser, createUser } from './api';
import firebase from '../firebases';
import Icon from "react-native-vector-icons/FontAwesome";

function Login(props) {

  const { loggedIn , hasAdress} = props.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [returnError, setReturnError ] = useState('');
  const { error_signup } = props.errors;

  useEffect(()=> {
      try {
        firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            const userInfo = await getUser(user.uid);
            // console.log('user', user)
            props.updateUser({
              ...userInfo,
              loggedIn: true
            });
            // console.log("stayed log in ------", user);
            if(hasAdress)
              props.navigation.navigate("Restaurants");
            else 
              props.navigation.navigate("Location")

          }
        });
      } catch (err) {
        console.log(err);
    }
  },[]);

  const onLogin = async () => {
    const { email, password } = props.user;
    try{
      const signedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(
          email,
          password
        );
        // console.log("signed", signedInUser);

      if(signedInUser) {
        const user = await getUser(signedInUser.user.uid);
        // console.log("find ui please", user);
        props.updateUser({
          ...user,
          id: signedInUser.user.uid
        });
        // props.navigation.navigate("Restaurants");
      }
    } catch (error) {
      console.log("errrorr-----sign", error);
      if(error) {
        const { message } = error;
        console.log("message", message)
        setReturnError(message);
      }
    }
  };

  const onCreateUser = async () => {
    const { email, password } = props.user;
    const res = await createUser({
      email,
      password
    });
    const { result , error } = res;
    if(result) {
      setModalVisible(false);
    } else {
      setReturnError(error);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Welcome</Text>
              <TextInput
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={text => props.updateUser({email: text})}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={ text => props.updateUser({password: text})}

              />
              { returnError !== '' &&
                <Text style={styles.errorInput} >{returnError}</Text>
              }
              <Button
                buttonStyle={styles.loginButton}
                onPress={()=> {
                  setReturnError('');
                  // console.log("helllo")
                  onLogin();
                }}//onLoginPress
                title="Login"
              />
              <Divider style={{ backgroundColor: 'purple', padding:1, margin:'10%', width:'80%' }} />
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
              <View style={[styles.centeredView, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
              <View style={styles.modalView}>
              <Icon
                name="close"
                size={30}
                color="black"
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.modalExit}
              />
              <Text style={styles.logoText2}>Sign Up</Text>
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
                    // console.log('false');
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
