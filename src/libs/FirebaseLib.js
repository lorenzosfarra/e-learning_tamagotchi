import firebase from "firebase";
import Firebase from "../config/Firebase";

const firebaseApp = firebase.initializeApp(Firebase);

// DB <-> FIRESTORE
const db = firebaseApp.firestore();

const FirebaseLib = {
    FIRESTORE_DB: db
};

export default FirebaseLib;