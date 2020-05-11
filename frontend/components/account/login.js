import React, { useState, useEffect } from "react";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, TouchablHighlight, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import styles from "../style";
import * as validations from './validations';
import { getUser, createUser } from '../api/api';
import firebase from '../../firebases';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from 'react-native-svg-uri';

function Login(props) {

  const { loggedIn , hasAdress} = props.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [returnError, setReturnError ] = useState('');
  const { error_signup } = props.errors;
  const [clearEmail, setClearEmail] = useState(false);
  const [clearPass, setClearPass] = useState(false);

  useEffect(()=> {
      try {
        firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            const userInfo = await getUser(user.uid);
            console.log('user', user)
            props.updateUser({
              ...userInfo,
              loggedIn: true
            });
            console.log("stayed log in ------", userInfo);
            if(userInfo.addresses !== undefined)
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
        {/* <View style={{ padding: 35}}>
          <Text>
            Hello
          </Text>
        </View> */}
      
     
        <View style={styles.loginScreenContainer}>
          {/* <View style={{ top: '10%', left: '10%'}}>
              <SvgUri
                style={{}}
                width="100"
                height="100"
                source={require('../../images/pizza-slice.svg')}
              />
           </View> */}

          <View style={styles.loginFormView}> 
          <View style={{}}>
              <SvgUri
                style={{}}
                width="100"
                height="100"
                source={require('../../images/pizza1.svg')}
              />
           </View>
            <Text style={styles.logoText}>Pizzaro</Text>
            <Input 
              containerStyle={{paddingBottom: 25}}
              label="Email"
              value={props.user.email}
              leftIcon={{ name: 'mail-outline', color: '#dddddd' }}
              leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
              inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
              rightIcon={clearEmail && <Icon 
                style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
                name="close"
                onPress={()=> {
                  setClearEmail(false);
                  props.updateUser({email: ""})
                }}  
                />}
              onChangeText={text =>  {
                setClearEmail(true)
                props.updateUser({email: text})
              }}
            />


            <Input 
              secureTextEntry={true}
              label="Password"
              leftIcon={{ name: 'lock-outline', color: '#dddddd' }}
              leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
              inputStyle={{paddingLeft: 15, color: '#13aa52'}}
            />
              {/* <TextInput
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

              /> */}
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
              {/* <Divider style={{ backgroundColor: 'purple', padding:1, margin:'10%', width:'80%' }} /> */}

              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 60}}>
                <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400', color: 'grey'}}> Don't have an account?</Text>
                <TouchableOpacity
                 onPress={() => {
                      setModalVisible(true);
                  }}
                >
                  <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"  Register"}</Text>
                </TouchableOpacity>
              </View>
       
              <Modal

                style={{ }}
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
              {/* <Icon
                name="close"
                color="black"
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.modalExit}
              /> */}
              <Text style={styles.logoText2}>Sign Up</Text>
    
              <TextInput
                placeholder="Name"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={text => props.updateUser({name: text})}
              />
             
              <TextInput
                placeholder="Phone"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={text => props.updateUser({phone: text})}
              />
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 35}}>
                <CheckBox
                  center
                  style={{}}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={props.user.isAccepted}
                  onPress={() => props.updateUser({isAccepted: !props.user.isAccepted})}
                />
                <Text style={{paddingTop: 10}}>
                  I have read and I accept the terms and conditions
                </Text>
              </View>
              

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
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 40}}>
                <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400', color: 'grey'}}>Already a member?</Text>
                <TouchableOpacity
                 onPress={() => {
                      setModalVisible(false);
                  }}
                >
                  <Text style={{textAlign:'center', fontSize: 15, color: 'green'}}>{"  Sign In"}</Text>
                </TouchableOpacity>
              </View>
       
            </View>
          </View>
        </Modal> 
     
       </View>

        

        {/* <View style={{padding: 35}}>
          <Input
            containerStyle={{ paddingBottom: 20}}
            label="Full Name"
      
            bottomDivider

          />
          <Input
              containerStyle={{ paddingBottom: 20}}
            label="Email"
          
            bottomDivider
          />
          <Input
                containerStyle={{ paddingBottom: 20}}
            label="Phone"
         
            bottomDivider

          />
          <Input
                containerStyle={{ paddingBottom: 20}}
            label="Password"
        
            bottomDivider
          />
        </View> */}
      

      </View> 
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

export default subscribe()(Login);
