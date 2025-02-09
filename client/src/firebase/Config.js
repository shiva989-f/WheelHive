// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// 1. Firebase frontend initialization
// Firebase used in add and edit car component for storing and deleting image yt video tut used for storing image and chatgpt tut used for deleting image

const firebaseConfig = {
  apiKey: "AIzaSyB-LQ97HVPKw4GUrRdHl_YPKBT2RUF7oVA",
  authDomain: "dav-college-ea906.firebaseapp.com",
  databaseURL: "https://dav-college-ea906-default-rtdb.firebaseio.com",
  projectId: "dav-college-ea906",
  storageBucket: "dav-college-ea906.appspot.com",
  messagingSenderId: "184683564452",
  appId: "1:184683564452:web:ded105ee163698a86d4531",
  measurementId: "G-S1BHDP9E8M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)