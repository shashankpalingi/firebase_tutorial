import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCR5NffXP5hhfyr3DSIzHsC5QeBL3i-8Is",
    authDomain: "fir-tutorial-f6ad1.firebaseapp.com",
    projectId: "fir-tutorial-f6ad1",
    storageBucket: "fir-tutorial-f6ad1.firebasestorage.app",
    messagingSenderId: "722235129749",
    appId: "1:722235129749:web:b971c1018099b8f842009c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
  
console.log("Firebase Connected!");

export { auth, db };