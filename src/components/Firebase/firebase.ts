import firebase from "firebase/app";

import "firebase/functions";
import "firebase/firestore";

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROD_APP_ID,
  measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID,
};

// const devConfig = {
//   apiKey: process.env.REACT_APP_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  db: firebase.firestore.Firestore;
  functions: firebase.functions.Functions;

  constructor() {
    //firebase.initializeApp();
    firebase.initializeApp(prodConfig);
    this.db = firebase.firestore();
    this.functions = firebase.functions();
    this.functions.useFunctionsEmulator("http://localhost:5001");

    if (process.env.NODE_ENV !== "production") {
      this.db.settings({
        host: "localhost:8080",
        ssl: false,
      });
    }
  }
}

export default Firebase;
