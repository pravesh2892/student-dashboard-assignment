import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCs35fw3AjoPo5rNBYK4ItOzfcZzhW8CQQ",
  authDomain: "student-dashboard-14440.firebaseapp.com",
  databaseURL: "https://student-dashboard-14440-default-rtdb.firebaseio.com",
  projectId: "student-dashboard-14440",
  storageBucket: "student-dashboard-14440.appspot.com",
  messagingSenderId: "45532654524",
  appId: "1:45532654524:web:3be75af5e9be05331699b9",
  measurementId: "G-NJ8NEHKYBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export { app, auth, database };