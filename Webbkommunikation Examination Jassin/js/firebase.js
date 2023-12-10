import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDS82W4QO38ZcjhLFtjcCbCCG4bw6MhMo",
  authDomain: "movie-library-19a8d.firebaseapp.com",
  projectId: "movie-library-19a8d",
  storageBucket: "movie-library-19a8d.appspot.com",
  messagingSenderId: "14415010986",
  appId: "1:14415010986:web:bed028abe71a65455fc4d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
