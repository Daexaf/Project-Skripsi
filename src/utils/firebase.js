// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMGnf0wzNin-lO2TUcZ7g79lKq7hB5xsE",
  authDomain: "auth-sopduren.firebaseapp.com",
  projectId: "auth-sopduren",
  storageBucket: "auth-sopduren.appspot.com",
  messagingSenderId: "577598373392",
  appId: "1:577598373392:web:2c4c246673f2922b9cd495",
  measurementId: "G-N1008TS4VR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
