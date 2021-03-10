import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDkqcnAjer-nnwuGRVSJY7rGL7STEKhxrk",
    authDomain: "reactapp-f4ac2.firebaseapp.com",
    databaseURL: "https://reactapp-f4ac2-default-rtdb.firebaseio.com",
    projectId: "reactapp-f4ac2",
    storageBucket: "reactapp-f4ac2.appspot.com",
    messagingSenderId: "356875855940",
    appId: "1:356875855940:web:7de3c38e1b0dc21679b411"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
           firebase.initializeApp(firebaseConfig);
           
  }
 
export default firebase;
