/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "clone-799fb.firebaseapp.com",
  projectId: "clone-799fb",
  storageBucket: "clone-799fb.appspot.com",
  messagingSenderId: "1027780346773",
  appId: "1:1027780346773:web:62b30df51104a0110c6c9c",
  measurementId: "G-RRQRZHL80M"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const Provider = new GoogleAuthProvider();


