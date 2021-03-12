import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

 const firebaseConfig = {
    apiKey: "AIzaSyCWQpdhh_A42ZdEl1BFjf0jcRPlpw2f-cs",
    authDomain: "crud-udemy-react-326b3.firebaseapp.com",
    projectId: "crud-udemy-react-326b3",
    storageBucket: "crud-udemy-react-326b3.appspot.com",
    messagingSenderId: "387562817207",
    appId: "1:387562817207:web:a3fe52ff74c61c1db92f32"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export {db,auth};