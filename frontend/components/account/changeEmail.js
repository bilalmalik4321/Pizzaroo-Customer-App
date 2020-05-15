import React, {useState} from 'react';
import { subscribe } from 'react-contextual';
import {  Text, View,StyleSheet, TouchableHighlight} from 'react-native';
import { uuidv4 , editAddresses, getUser,} from '../api';
import { ListItem} from "react-native-elements";
import { Input, Badge} from 'react-native-elements';
import moment from 'moment';
import firebase from '../../firebases';

const timestamp = moment()
    .utcOffset('+05:30')
    .format('YYYY-MM-DD hh:mm:ss a');

const ChangeAddress = props => {
  
  console.log("user", props.user)

  const [current, setCurrent] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors , setErrors] = useState({});

  const [success, setSuccess] = useState(false);

  const validation = ( current, newEmail, password) => {
    let errors  = {};
    const userInfo = firebase.auth().currentUser;

    const { email } = userInfo;
    if(!current) errors.current = "Please enter current email!";
    if(!current && current.length < 6) errors.current  = "Please enter current email!";
    if(!newEmail) errors.newEmail = "Please enter a new email!";
    if(!password) errors.password = "Please enter a password!";
    if( !current && email !== current) errors.current = "This is not your current email!"

    return errors;
  }
  console.log('errors', errors);
  console.log("email---", current, 'new---',newEmail , 'password', password)
  const onSave = async (email, newEmail, password) => {
    const errors = validation(email, newEmail, password);
    setErrors(errors);
    console.log("email inside---", email, 'new---',newEmail , 'password', password,'should be false',Object.keys(errors).length === 0)
    
    if( Object.keys(errors).length === 0) {
      try{
        const signedIn =firebase
        .auth()
        .signInWithEmailAndPassword(
          email,
          password
        ).then(async userInfo => {

          userInfo.user.updateEmail(newEmail);

          const result = await firebase.firestore()
          .doc(`customers/${userInfo.user.uid}`)
          .set({
            email: newEmail
          },
          { merge: true});

          const updatedUser = await getUser(userInfo.user.uid);

          props.updateUser({
            ...updatedUser,
            loggedIn: true
          });
          
          setSuccess(true);
          setCurrent('');
          setNewEmail('');
          setPassword('');
        })
        .catch(err => {
          let error = {};
          error.newEmail = err.message;
          // console.log("what went wrong?", err)
          setErrors(error);
        });
      } catch (err) {
      let error = {};
      error.newEmail = err.message;
      setErrors(error);
      // console.log("err from change email", err);
    }
  }
}
  // console.log("screen-----", props.user.previousScreen)
  return(
    <View style={{...styles.centeredView}}>
      <View style={styles.modalView}>
        <View style={{paddingBottom: 40, justifyContent: 'center'}}> 
          { success && <Badge  
            value="Successfully update your email!"
            status="success"
            /> }
        </View>
        <View style={{ paddingBottom: 20}}>
          <Input
            label="Current Email"
            value={current}
            onChangeText={text => {
              setSuccess(false);
              setCurrent(text);
            }}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.current ? errors.current: ''}
          />
        </View>
        <View style={{ paddingBottom: 20}}>
          <Input
            label="New Email"
            value={newEmail}           
            onChangeText={text => {
              setSuccess(false);
              setNewEmail(text);
            
            }}
            errorMessage={errors.newEmail!=null ? errors.newEmail : ''}
            errorStyle={{ color: 'red' }}
          />
        </View>
        <View style={{ paddingBottom: 20}}>
          <Input
            secureTextEntry={true}
            label="Current Password"
            value={password}
            onChangeText={text => {
              setSuccess(false);
              setPassword(text);
            }}
            errorMessage={errors.password !=null ? errors.password : ''}
            errorStyle={{ color: 'red' }}
          />
        </View>
  
        <View style={{backgroundColor: 'white', paddingTop: 50 ,paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent:'space-between'}}>
          <TouchableHighlight
            style={{ ...styles.openButton,width: '45%', backgroundColor: "#ff6363"}}
            onPress={() => {
              setSuccess(false);
              props.navigation.navigate('Account');
            }}
          >
            <Text style={styles.textStyle}>
              Cancel
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton,width: '45%', backgroundColor: "#2196F3"}}
            onPress={() => {
              setSuccess(false);
              setErrors({});
              onSave(current, newEmail, password);
            }}
          >
            <Text style={styles.textStyle}>
              Save
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
};

export default subscribe()(ChangeAddress);


const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: "center"
  },
  modalView: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    paddingRight: 35,
    paddingLeft: 35,
    paddingBottom: 35,
    paddingTop: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
