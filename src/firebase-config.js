import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage



const firebaseConfig = {
  apiKey: "AIzaSyDRAxVAnzoZaYkGP3K12ZtLU5Hw7CpTwaI",
  authDomain: "trip1-16684.firebaseapp.com",
  databaseURL: "https://trip1-16684-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trip1-16684",
  storageBucket: "trip1-16684.appspot.com",
  messagingSenderId: "824426729244",
  appId: "1:824426729244:web:f7273b8e06fe558f70b4d9",
  measurementId: "G-WQRFS8T378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Exporting Firebase services for use in other parts of the application
export { db, auth, storage, analytics };
