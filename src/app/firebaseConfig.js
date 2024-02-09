// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_rBak5Zb7rlQmBK70y4rHOI-fnDlvhp0",
  authDomain: "mywallet-afcbb.firebaseapp.com",
  databaseURL: "https://mywallet-afcbb-default-rtdb.firebaseio.com",
  projectId: "mywallet-afcbb",
  storageBucket: "mywallet-afcbb.appspot.com",
  messagingSenderId: "261378138156",
  appId: "1:261378138156:web:3b20797308f7abfd2ab189",
  measurementId: "G-RRH82BBVYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const analytics = getAnalytics(app);

export { database };
