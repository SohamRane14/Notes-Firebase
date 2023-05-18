import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    apiKey: "AIzaSyD02Rte3eQwqEYa6ltaAdyFXnP1A1W9YjY",
    authDomain: "notes-acc10.firebaseapp.com",
    projectId: "notes-acc10",
    storageBucket: "notes-acc10.appspot.com",
    messagingSenderId: "58937629478",
    appId: "1:58937629478:web:27f3fefc865bf226943fe7"
})

export const auth = app.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
        .then()
        .catch((error)=> console.log(error))
}
export const firestore = app.firestore()
export const database = {
    users: firestore.collection('users'),
    notesM: firestore.collection('notes'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}