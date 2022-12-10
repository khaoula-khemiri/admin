// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvZXB8Q_6hgK19dSQvy8rwrJRL6Y5gEIc",
    authDomain: "shopapp-fbcde.firebaseapp.com",
    projectId: "shopapp-fbcde",
    storageBucket: "shopapp-fbcde.appspot.com",
    messagingSenderId: "407728524593",
    appId: "1:407728524593:web:31bf14be6ae7c6c6ba3410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app