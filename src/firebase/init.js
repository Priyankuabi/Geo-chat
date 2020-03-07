import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD0YKBiloFFpUJgLJkhkgrC43zxFOY8hyU",
    authDomain: "geo-chat-d7880.firebaseapp.com",
    databaseURL: "https://geo-chat-d7880.firebaseio.com",
    projectId: "geo-chat-d7880",
    storageBucket: "geo-chat-d7880.appspot.com",
    messagingSenderId: "950742569770",
    appId: "1:950742569770:web:295f2e3a51842fe2a88453"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore()