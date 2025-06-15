// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnGmxNPi64VlHysOIkse4RZYTFWfx-ZW8",
  authDomain: "paperforge-b56dd.firebaseapp.com",
  projectId: "paperforge-b56dd",
  storageBucket: "paperforge-b56dd.firebasestorage.app",
  messagingSenderId: "352919376947",
  appId: "1:352919376947:web:35a641b668814540837f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);