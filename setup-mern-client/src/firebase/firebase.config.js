// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrXjQ0Z5u0eixqwDsVs9Kiip_uj95tEtw",
  authDomain: "mern-book-inventory-58838.firebaseapp.com",
  projectId: "mern-book-inventory-58838",
  storageBucket: "mern-book-inventory-58838.firebasestorage.app",
  messagingSenderId: "174722419155",
  appId: "1:174722419155:web:942406dde84e9d9e9a8726"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;