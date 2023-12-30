// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2EBvWefIqpQJj-ueARMOckRqPw5ziOYg",
  authDomain: "icorte-5cc11.firebaseapp.com",
  projectId: "icorte-5cc11",
  storageBucket: "icorte-5cc11.appspot.com",
  messagingSenderId: "575713557136",
  appId: "1:575713557136:web:cf0cf6ffb31f415f8bf615",
  measurementId: "G-JNWVZ7YL5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const environment = {
  apiKey: "AIzaSyD2EBvWefIqpQJj-ueARMOckRqPw5ziOYg",
  authDomain: "icorte-5cc11.firebaseapp.com",
  projectId: "icorte-5cc11",
  storageBucket: "icorte-5cc11.appspot.com",
  messagingSenderId: "575713557136",
  appId: "1:575713557136:web:cf0cf6ffb31f415f8bf615",
  measurementId: "G-JNWVZ7YL5Y",
  production: false
};
 */