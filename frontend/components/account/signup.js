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
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SvgUri from 'react-native-svg-uri';

// import pinpoint from '../../images/pizza.svg'
function Login(props) {

  const { loggedIn , hasAdress} = props.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [returnError, setReturnError ] = useState('');
  const { error_signup } = props.errors;
  const [clearEmail, setClearEmail] = useState(false);
  const [clearPass, setClearPass] = useState(false);
  const [clearName, setClearName] = useState(false);
  const [clearPhone, setClearPhone] = useState(false);
  const [clearRepeatPass, setClearRepeatPass] = useState(false);



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
        <ScrollView>
  
        <View style={styles.loginScreenContainer}>
          <View style={{flex: 1, justifyContent: 'center' , alignItems: 'center', paddingLeft: 35, paddingRight: 35,paddingTop: '60%'}}> 
        
              <View style={{}}>
                <SvgUri
                  style={{}}
                  width="100"
                  height="100"
                  source={require('../../images/pizza1.svg')}
                />
            </View>
            <Text style={{ color: '#ff6363',
                          fontSize: 40,
                          fontWeight: "200",
                          textAlign: "center",
                          paddingBottom: 15}}
             >Pizzaro</Text>

            <Input 
              containerStyle={{paddingBottom: 25}}
              label="Name"
              value={props.user.name}
              leftIcon={{ name: 'person-outline', color: '#dddddd' }}
              leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
              inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
              rightIcon={clearName && <Icon 
                style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
                name="close"
                onPress={()=> {
                  setClearName(false);
                  props.updateUser({name: ""})
                }}  
                />}
              onChangeText={text =>  {
                setClearName(true)
                props.updateUser({name: text})
              }}
            />
              <Input 
             dataDetectorTypes="phoneNumber"
                containerStyle={{paddingBottom: 25}}
                label="Phone"
                type
                value={props.user.phone}
                leftIcon={{ name: 'phone-iphone', color: '#dddddd' }}
                leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
                inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
                rightIcon={clearPhone && <Icon 
                  style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
                  name="close"
                  onPress={()=> {
                    setClearPhone(false);
                    props.updateUser({phone: ""})
                  }}  
                  />}
                onChangeText={text =>  {
                  setClearPhone(true)
                  props.updateUser({phone: text})
                }}
            />

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
            />
            <Input 
              secureTextEntry={true}
              containerStyle={{paddingBottom: 25}}
              label="Comfirm Password"
              value={props.user.repeatPassword}
              leftIcon={{ name: 'lock-outline', color: '#dddddd' }}
              leftIconContainerStyle={{ alignSelf: 'flex-start', marginLeft: 0}}
              inputStyle={{paddingLeft: 15, color: '#13aa52', fontWeight: '300'}}
              rightIcon={clearRepeatPass && <Icon 
                style={{color: '#dddddd', fontWeight: '200', fontSize: 20}} 
                name="close"
                onPress={()=> {
                  setClearRepeatPass(false);
                  props.updateUser({repeatPassword: ""})
                }}  
                />}
              onChangeText={text =>  {
                setClearRepeatPass(true)
                props.updateUser({repeatPassword: text})
              }}
            />
  
          
              <Button
                buttonStyle={{    backgroundColor: "#13aa52",
                                  borderRadius: 25,
                                  width: '100%',
                                  marginTop: 35,
                                  paddingLeft: '15%',
                                  paddingRight: '15%'
                            }}
                onPress={()=> {
                  setReturnError('');
                  // console.log("helllo")
                  // onLogin();
                }}//onLoginPress
                title="Register"
              />
           

              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 40}}>
                <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400', color: 'grey'}}>Already a member?</Text>
                <TouchableOpacity
                 onPress={() => {
                      props.navigation.navigate('LoginScreen')
                  }}
                >
                  <Text style={{textAlign:'center', fontSize: 15, color: 'green', fontWeight: '300'}}>{"  Sing In"}</Text>
                </TouchableOpacity>
              </View>
       </View>
      </View> 
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

export default subscribe()(Login);
