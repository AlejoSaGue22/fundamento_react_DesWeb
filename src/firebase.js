
import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC8Q91ylmwonJVgGkn6INemgefGZAq7Gfc",
  authDomain: "bibliotecaalejo-react.firebaseapp.com",
  projectId: "bibliotecaalejo-react",
  storageBucket: "bibliotecaalejo-react.appspot.com",
  messagingSenderId: "741409852601",
  appId: "1:741409852601:web:85d640a3cd26cd88a2df68"
};


    firebase.initializeApp(firebaseConfig);

    export {firebase}