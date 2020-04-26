import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import firebase from './firebases';
export default function App() {


  const onCreateUser = async () => {
    try{
      console.log("hello", firebase);
      // const db = firebase.firestore();
      const signin = await firebase.auth().createUserWithEmailAndPassword(
        '1231231223@email.com',
        '123-123-123'
      );
      console.log('user', signin);
       await firebase.firestore()
      .collection('customers')
      .doc(signin.user.uid)
      .set(
        {
          name: 'hello',
          email: 'hello@test.com'
         },
         {
           merge: true
         }
      );
      // console.log("ressss", res);
    } catch (err){
      console.log("error", err);
    }
   
  };
  return (
    <View style={styles.container}>
      <Button
        title="Press on"
        onPress={()=> {
          onCreateUser();
        }}
      >

      </Button>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
