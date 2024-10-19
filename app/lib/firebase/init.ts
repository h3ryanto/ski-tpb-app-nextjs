// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlGMFhaKcsOlrnfUbAxR04QqAIWU6pobY",
    authDomain: "nextjs-app-54bfd.firebaseapp.com",
    databaseURL: "https://nextjs-app-54bfd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nextjs-app-54bfd",
    storageBucket: "nextjs-app-54bfd.appspot.com",
    messagingSenderId: "348719095438",
    appId: "1:348719095438:web:9171a57206aeb9351a33df"
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

export default app;