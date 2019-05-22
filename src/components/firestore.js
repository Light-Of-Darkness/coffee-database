import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0lcRP8g1KEwTiDBtaANTetJfzwok-GmQ",
    authDomain: "coffee-recipes-27825.firebaseapp.com",
    databaseURL: "https://coffee-recipes-27825.firebaseio.com",
    projectId: "coffee-recipes-27825",
    storageBucket: "coffee-recipes-27825.appspot.com",
    messagingSenderId: "443430980526",
    appId: "1:443430980526:web:853a6e0886c531a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;