import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD-gzeTTlMEkP7hyDl_CYsu6YPkORDyAAk",
  authDomain: "login-auth-34131.firebaseapp.com",
  databaseURL: "https://login-auth-34131.firebaseio.com",
  projectId: "login-auth-34131",
  storageBucket: "login-auth-34131.appspot.com",
  messagingSenderId: "355536341979"
});

const base = Rebase.createClass(firebase.database());
export { firebaseApp };
export const firestore = firebaseApp.firestore();
export default base;