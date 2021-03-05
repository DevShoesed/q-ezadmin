import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBSj7JtXjga_D1SfbyUzm7W443rEczvvKg",
  authDomain: "ezadmin-37672.firebaseapp.com",
  databaseURL:
    "https://ezadmin-37672-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ezadmin-37672",
  storageBucket: "ezadmin-37672.appspot.com",
  messagingSenderId: "187516568499",
  appId: "1:187516568499:web:8a1b0f76d9acfb5d4ec1c6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
