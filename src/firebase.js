import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "book-app-c72b6.firebaseapp.com",
  projectId: "book-app-c72b6",
  storageBucket: "book-app-c72b6.appspot.com",
  messagingSenderId: "212898131193",
  appId: "1:212898131193:web:947647e239fe6ac6d50628"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage()
export const db = getFirestore()