import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAKdaWIEtREUuqgIUhzrdn2hwprQ0uCFSY",
    authDomain: "pictogram-instagram-clone.firebaseapp.com",
    databaseURL: "https://pictogram-instagram-clone.firebaseio.com",
    projectId: "pictogram-instagram-clone",
    storageBucket: "pictogram-instagram-clone.appspot.com",
    messagingSenderId: "943721560669",
    appId: "1:943721560669:web:c8e0391de16d7171382bb4",
    measurementId: "G-F0F6N69WRJ"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export { db, auth, storage };