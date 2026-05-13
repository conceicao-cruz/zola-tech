import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./assets/logo.jpg";

import app from "./firebase/firebase";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginPage() {

  const navigate = useNavigate();

  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Preenche todos os campos");
      return;
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login realizado com sucesso 🚀");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div style={styles.container}>

      {/* OVERLAY */}
      <div style={styles.overlay} />

      {/* BOX */}
      <div style={styles.box}>

        {/* LOGO */}
        <div style={styles.logoBox}>

          <img
            src={logo}
            alt="Zola Tech"
            style={styles.logo}
          />

          <h1 style={styles.title}>
            ZOLA TECH
          </h1>

          <p style={styles.subtitle}>
            Acede à tua plataforma de aprendizagem
          </p>

        </div>

        {/* FORM */}
        <div style={styles.form}>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {/* BOTÃO LOGIN */}
          <button
            onClick={handleLogin}
            style={{
              ...styles.loginButton,
              opacity: email && password ? 1 : 0.6,
              cursor: email && password
                ? "pointer"
                : "not-allowed",
            }}
            disabled={!email || !password}
          >
            Entrar
          </button>

          {/* BOTÃO REGISTO */}
          <button
            onClick={() => navigate("/register")}
            style={styles.registerButton}
          >
            Criar Conta
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#0d0d0d",

    fontFamily: "Arial, sans-serif",

    position: "relative",

    padding: "0",
  },

  overlay: {
    position: "absolute",
    inset: 0,

    background:
      "linear-gradient(135deg, rgba(106,13,173,0.25), rgba(212,175,55,0.15))",
  },

  /* RESPONSIVO */
  box: {
    position: "relative",
    zIndex: 2,

    width: "90%",
    maxWidth: "380px",

    padding: "40px",

    backgroundColor: "rgba(21,21,21,0.92)",

    borderRadius: "16px",

    border: "1px solid rgba(106,13,173,0.4)",

    textAlign: "center",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.6)",
  },

  logoBox: {
    marginBottom: "25px",
  },

  logo: {
    width: "60px",
    height: "60px",

    objectFit: "cover",

    borderRadius: "12px",

    border: "2px solid #D4AF37",

    marginBottom: "10px",
  },

  title: {
    color: "#D4AF37",

    margin: 0,

    letterSpacing: "2px",

    fontSize: "22px",

    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",

    fontSize: "12px",

    marginTop: "5px",
  },

  form: {
    display: "flex",

    flexDirection: "column",

    gap: "14px",
  },

  input: {
    padding: "12px",

    borderRadius: "10px",

    border: "1px solid #333",

    backgroundColor: "#0f0f0f",

    color: "white",

    outline: "none",
  },

  loginButton: {
    padding: "12px",

    borderRadius: "10px",

    border: "none",

    background:
      "linear-gradient(135deg, #6A0DAD, #8E44AD)",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(106,13,173,0.35)",

    transition: "0.3s ease",
  },

  registerButton: {
    padding: "12px",

    borderRadius: "10px",

    border: "1px solid #D4AF37",

    background: "transparent",

    color: "#D4AF37",

    fontWeight: "bold",

    cursor: "pointer",

    transition: "0.3s ease",
  },
};

export default LoginPage;