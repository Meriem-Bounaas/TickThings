import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYO_3Mp7Fy81tO_zVXEnEbSqpVNjxZISE",
    authDomain: "authentication-todo-68da9.firebaseapp.com",
    projectId: "authentication-todo-68da9",
    storageBucket: "authentication-todo-68da9.appspot.com",
    messagingSenderId: "137954009742",
    appId: "1:137954009742:web:d56c7897950828e19a9fdf",
    measurementId: "G-SR947V11TP"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);