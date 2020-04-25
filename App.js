import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import firebase from './firebase';
export default async function App() {


  const onCreateUser = async () => {
    try{
      const res = await firebase.firestore()
      .collection('users')
      .doc('user-test-123')
      .add(
        {
          name: 'hello',
          email: 'hello@test.com'
         }
      );

      console.log("ressss\n", res);
    } catch (err){
      console.log("error", err);
    }
   
  }
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
