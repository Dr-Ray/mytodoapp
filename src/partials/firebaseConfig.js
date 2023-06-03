import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Sdk config 
const firebaseConfig = {
    apiKey: "AIzaSyCYRGSdlzAc9UY1e60m33HC5ypqhYv7DVQ",
    authDomain: "todoapp-98304.firebaseapp.com",
    projectId: "todoapp-98304",
    storageBucket: "todoapp-98304.appspot.com",
    messagingSenderId: "1040276335530",
    appId: "1:1040276335530:web:238b2c59b9fa23c55ad9d3",
    measurementId: "G-KCCE15FHH4"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }