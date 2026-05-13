import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "./firebase/firebase";
import logo from "./assets/logo.jpg";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

function LoginPage() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      alert("Email ou senha inválidos");
    }
  };

  const resetPassword = async () => {
    if (!email) return alert("Escreve o email primeiro");

    await sendPasswordResetEmail(auth, email);
    alert("Enviámos link de recuperação");
  };

  return (
    <div style={styles.container}>
      <img src={logo} style={styles.logo} />

      <h2>ZOLA TECH</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Entrar</button>

      <p onClick={resetPassword} style={{ color: "gold", cursor: "pointer" }}>
        Esqueci a palavra-passe
      </p>

      <button onClick={() => navigate("/register")}>
        Criar conta
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0d0d0d",
    color: "white"
  },
  logo: { width: 80, marginBottom: 20 }
};

export default LoginPage;