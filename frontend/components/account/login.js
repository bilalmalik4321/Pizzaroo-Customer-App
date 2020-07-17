import React, { useState, useEffect } from "react";
import { Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView , Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import firebase from '../../firebase';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

import styles from "../style";
import * as validations from './validations';
import { getUser } from '../api';

/**
 * Login component - render the login prompt for user
 * @param {Object} props 
 */

function Login(props) {

  const [loading, setLoading] = useState(false);
  const { loggedIn ,justSignedUp} = props.user;
  const [returnError, setReturnError ] = useState('');
  const [clearEmail, setClearEmail] = useState(false);
  const [clearPass, setClearPass] = useState(false);
  
  const errors = props.errors.error_signin;

  // use firebase api to keep user logged in unless they sign out
  // to prevent logging out user when they come back to the app
  useEffect(()=> {
      try {
        firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            const userInfo = await getUser(user.uid);
            const { emailVerified } = user;
            
            if(!loggedIn) {
              props.updateUser({
                ...userInfo,
                emailVerified,
                loggedIn: true
              });
            }

            // check if their email has been verified
            if(emailVerified) {
              // if yes get all the orders
              props.getCustomerOrders();
              // if there is no address 
              // bring user to the location screen
              if(userInfo.addresses !== undefined && userInfo.addresses.length !== 0)
                props.navigation.navigate("Restaurants");
              else 
                props.navigation.navigate("Location");
            
            } 
          }
        });
      } catch (err) {
        console.log(err);
      }
  },[loggedIn, props.getCustomerOrders]);


  // sign in user with firebase auth api
  const onLogin = async () => {

    setLoading(true);
    // get email and password from the user
    const { email, password } = props.user;
    try{
      const signedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(
          email,
          password
        );

      const { emailVerified } = firebase.auth().currentUser;
      
      
      if(signedInUser && emailVerified) {
        const user = await getUser(signedInUser.user.uid);
        // get user detail from database and update the global store
        props.updateUser({
          ...user,
          id: signedInUser.user.uid
        });
        // navigate user to the home page
        props.navigation.navigate("Restaurants");
      } else {
        // if they are not verified yet, render the message screen
        props.navigation.navigate('Verify');
      }
    } catch (error) {
    
      if(error) {
        const { message } = error;
        console.log("message", message)
        setReturnError(message);
      }
    }
    setLoading(false);
  };


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
		      <ImageBackground style = {{flex: 1, resizeMode: 'stretch'}} source = {require('../../images/login-bg.jpg')}>
            <View style={styles.loginFormView}> 
              <View style={{}}>
                <Image
                  width="100"
                  height="100"
                  source={require('../../images/pizza.png')}
                  
                />
                <Text style={styles.logoText}>Pizzaro</Text>
		        	</View>

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
                renderErrorMessage={(errors && errors.email) || returnError}
                errorMessage={returnError || errors.email}
            />

            <Input 
              secureTextEntry={true}
              containerStyle={{paddingBottom: 25}}
              label="Password"
              value={props.user.password}
              leftIcon={{ name: 'lock-outline', color: '#dddddd' }}
              leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
              inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
              rightIcon={clearPass && <Icon 
                style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
                name="close"
                onPress={()=> {
                  setClearPass(false);
                  props.updateUser({password: ""})
                }}  
                />}
              onChangeText={text =>  {
                setClearPass(true)
                props.updateUser({password: text})
              }}
              renderErrorMessage={errors && errors.password}
              errorMessage={errors.password}
        
            />
           <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                  props.navigation.navigate('ForgotPassword')
              }}
            >
              <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"Forgot password?"}</Text>
            </TouchableOpacity>
          </View>

          <Button
            disabled={loading}
            loading={loading}
            buttonStyle={{...styles.loginButton, marginTop: 30}}
            onPress={()=> {
              setReturnError('');
              const errs  = validations.signin(props);
              if( Object.keys(errs).length === 0) {
                onLogin();
              }
            }}
            title="Login"
          />
        
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 60}}>
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400', color: 'grey'}}> Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                  props.clearUser();
                  props.navigation.navigate('Signup')
              }}
            >
              <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"  Register"}</Text>
            </TouchableOpacity>
          </View>
       </View>
	   </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

export default subscribe()(Login);
