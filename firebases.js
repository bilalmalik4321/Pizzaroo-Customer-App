
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

// get firebase config from serviceAccount.js
// get the config from google console/setting/general
const config = {
    apiKey: "AIzaSyCoF9_EHc17iiP4BbF9Eb6M9mJaBHbtEG0",
    authDomain: "pizzaro-staging.firebaseapp.com",
    databaseURL: "https://pizzaro-staging.firebaseio.com",
    projectId: "pizzaro-staging",
    storageBucket: "pizzaro-staging.appspot.com",
    messagingSenderId: "517159839848",
    appId: "1:517159839848:web:a7208f0ebebefc9717b3dd",
    measurementId: "G-HD6MZV0280"
};


firebase.initializeApp(config);

// const db = firebase.firestore();
// const createUser = async payload => {
//   try {
    
//     // sign up user with firebase auth
//     const signedUpUser = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(
//         payload.email,
//         payload.password
//       );
		
// 		console.log("user sign up", signedUpUser)
//     // send verification email TODO
//     // signedUpUser.user.sendEmailVerification();

//     // delete password to secure
//     const userInfo = payload;
//     delete userInfo.password;

//     // user is created in auth but not in the collection

// 		await db
// 			.collection('customers')
// 			.doc(signedUpUser.user.uid)
// 			.set({...userInfo},{merge: true});

// 		// return true after success
// 		return true;
    
//   } catch (error) {
// 		console.log('create user fails',error);
// 		return false;
//   }
// };



export default firebase;
