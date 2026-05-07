import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmZ9hzj9bg3De6X6hUJhjWbHaGUI0abBk",
  authDomain: "zola-tech.firebaseapp.com",
  projectId: "zola-tech",
  storageBucket: "zola-tech.appspot.com",
  messagingSenderId: "256263516613",
  appId: "1:256263516613:web:016d1352e5e2c7198a5bac",
  measurementId: "G-6FRY3W0SPJ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

/* 🔥 LOGIN AUTOMÁTICO (tipo Instagram) */
setPersistence(auth, browserLocalPersistence);

export { db, auth };
export default app;