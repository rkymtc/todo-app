// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, push, update, remove, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBjYvFE09XkKMHbUoNhM0gA4SmcKeDvk3Q",
  authDomain: "noteapp-4b363.firebaseapp.com",
  projectId: "noteapp-4b363",
  storageBucket: "noteapp-4b363.firebasestorage.app",
  messagingSenderId: "931019035579",
  appId: "1:931019035579:web:653039e94d74e46f4d6a9e",
  measurementId: "G-S74B7PV13T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { database, ref, set, get, push, update, remove, onValue };
