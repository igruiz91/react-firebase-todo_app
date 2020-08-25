import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWtLeClh5JTwXMqUk2oWk1vF6nI6gFR9Q",
  authDomain: "todo-app-7d904.firebaseapp.com",
  databaseURL: "https://todo-app-7d904.firebaseio.com",
  projectId: "todo-app-7d904",
  storageBucket: "todo-app-7d904.appspot.com",
  messagingSenderId: "149383881671",
  appId: "1:149383881671:web:35f54c1d2c066e0b44efe2",
  measurementId: "G-G202WRLT2L",
});

const db = firebaseApp.firestore()

export default db;

