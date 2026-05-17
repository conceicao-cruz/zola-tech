import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

/* CONFIG FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyDmZ9hzj9bg3De6X6hUJhjWbHaGUI0abBk",
  authDomain: "zola-tech.firebaseapp.com",
  projectId: "zola-tech",
  storageBucket: "zola-tech.appspot.com",
  messagingSenderId: "256263516613",
  appId: "1:256263516613:web:016d1352e5e2c7198a5bac",
  measurementId: "G-6FRY3W0SPJ",
};

/* INIT APP */
const app = initializeApp(firebaseConfig);

/* SERVICES */
const db = getFirestore(app);
const auth = getAuth(app);

/* LOGIN PERSISTENTE */
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("🔥 Persistência ativa (login automático ligado)");
  })
  .catch((error) => {
    console.error("Erro na persistência:", error);
  });

/* EXPORTAÇÃO CORRETA */
export { app, db, auth };
export default app;
