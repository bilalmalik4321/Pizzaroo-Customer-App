import React, { useState } from "react";
import {Keyboard, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView , Image} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';

import firebase from '../../firebases';
import styles from "../style";

/**
 * Login component - render the login prompt for user
 * @param {Object} props 
 */

const ResetPassword = () => {


  const [returnError, setReturnError ] = useState('');
  const [clearEmail, setClearEmail] = useState(false);
  const [toggleSuccess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const onReset = async () => {
    try {
      setLoading(true);

      await firebase.auth().sendPasswordResetEmail(email);

      setLoading(false);
      setSuccess(true);
      setEmail('');
    } catch (error) {

      if (error.code === 'auth/user-not-found') {
        setReturnError('Your email is not linked to any accounts.');
      } else {
        setReturnError('Something went wrong ...!')
      }
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{...styles.loginScreenContainer}}>
          <View style={{...styles.loginFormView, marginTop: -50}}> 
            <Image
              width="100"
              height="100"
              source={require('../../images/pizza.png')}
            />
          <Text style={styles.logoText}>Pizzaro</Text>
          
          <Input 
            containerStyle={{paddingBottom: 25}}
            label="Email"
            value={email}
            leftIcon={{ name: 'mail-outline', color: '#dddddd' }}
            leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
            inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
            rightIcon={clearEmail && <Icon 
              style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
              name="close"
              onPress={()=> {
                setClearEmail(false);
                setReturnError('')
                setEmail('')
              }}  
              />}
            onChangeText={text =>  {
              setReturnError('')
              setClearEmail(true)
              setEmail(text)
            }}
            renderErrorMessage={returnError}
            errorMessage={returnError}
          />

            {
              toggleSuccess && 
              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, marginBottom: 10}}>
                <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"The reset password link has been sent your email."}</Text>
              </View>
            }
       


          <Button
            disabled={loading}
            loading={loading}
            buttonStyle={{...styles.loginButton, marginTop: 30}}
            onPress={()=> {

              if(!email) {
                setReturnError('Please enter your email.');
              } else {
                onReset();
              }
          
            }}
            title="Reset"
          />
      
       </View>
      </View> 
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

export default ResetPassword;
