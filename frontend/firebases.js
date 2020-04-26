
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

export default firebase;
