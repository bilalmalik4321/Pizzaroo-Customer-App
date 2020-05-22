import React, { useState, useEffect } from "react";
import {Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView , Image, ImageBackground} from 'react-native';
import { Button } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import firebase from '../../firebases';
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

  console.log('user signed up---', justSignedUp);
  console.log("current user", firebase.auth().currentUser);
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

            if(emailVerified) {
           
              props.getCustomerOrders();

              if(userInfo.addresses !== undefined)
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

  const onLogin = async () => {

    setLoading(true);
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
        // console.log("find ui please", user);
        props.updateUser({
          ...user,
          id: signedInUser.user.uid
        });
        props.navigation.navigate("Restaurants");
      } else {
        props.navigation.navigate('Verify');
      }
    } catch (error) {
      // console.log("errrorr-----sign", error);
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
