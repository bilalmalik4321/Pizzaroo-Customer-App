import React, { useState, useEffect } from "react";
import {Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView , YellowBox} from 'react-native';
import { Button } from 'react-native-elements';
import { subscribe } from 'react-contextual';
import styles from "../style";
import * as validations from './validations';
import { getUser } from '../api/api';
import firebase from '../../firebases';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
// import SvgUri from 'react-native-svg-uri';

function Login(props) {

  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
  const { loggedIn } = props.user;
  const [returnError, setReturnError ] = useState('');
  const [clearEmail, setClearEmail] = useState(false);
  const [clearPass, setClearPass] = useState(false);
  
  const errors = props.errors.error_signin;

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
            props.getCustomerOrders()
            // console.log("stayed log in ------", userInfo);
            if(userInfo.addresses !== undefined)
              props.navigation.navigate("Restaurants");
            else 
              props.navigation.navigate("Location")

          }
        });
      } catch (err) {
        console.log(err);
    }
  },[loggedIn, props.getCustomerOrders]);

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
        props.navigation.navigate("Restaurants");
      }
    } catch (error) {
      // console.log("errrorr-----sign", error);
      if(error) {
        const { message } = error;
        console.log("message", message)
        setReturnError(message);
      }
    }
  };


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}> 
          {/* <View style={{}}>
            <SvgUri
              style={{}}
              width="100"
              height="100"
              source={require('../../images/pizza1.svg')}
            />
          </View> */}
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
            onChangeText={text =>  {``
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
           
          <Button
            buttonStyle={styles.loginButton}
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
                  props.navigation.navigate('Signup')
              }}
            >
              <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"  Register"}</Text>
            </TouchableOpacity>
          </View>
       </View>
      </View> 
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

export default subscribe()(Login);
