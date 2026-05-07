import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./assets/logo.jpg";

/* FIREBASE */
import app, { db } from "./firebase/firebase";

/* AUTH */
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/* FIRESTORE */
import {
  doc,
  setDoc,
} from "firebase/firestore";

function RegisterPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  /* STATES */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* REGISTAR */
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Preenche todos os campos");
      return;
    }

    setLoading(true);

    try {
      /* CRIAR UTILIZADOR */
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      /* GUARDAR DADOS NO FIRESTORE */
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      console.log("✅ Utilizador criado e salvo no Firestore");

      alert("Conta criada com sucesso 🚀");

      /* IR PARA DASHBOARD */
      navigate("/dashboard");

    } catch (error) {
      console.log("ERRO FIREBASE:", error.code);

      if (error.code === "auth/email-already-in-use") {
        alert("Este email já está registado");
      } else if (error.code === "auth/weak-password") {
        alert("Password muito fraca (mínimo 6 caracteres)");
      } else {
        alert(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.box}>
        {/* LOGO */}
        <div style={styles.logoBox}>
          <img src={logo} alt="Zola Tech" style={styles.logo} />

          <h1 style={styles.title}>ZOLA TECH</h1>

          <p style={styles.subtitle}>Cria a tua conta</p>
        </div>

        {/* FORM */}
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handleRegister}
            style={{
              ...styles.registerButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          <button
            onClick={() => navigate("/login")}
            style={styles.loginButton}
          >
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0d0d0d",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(106,13,173,0.25), rgba(212,175,55,0.08))",
  },

  box: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "420px",
    background: "rgba(18,18,18,0.95)",
    borderRadius: "28px",
    padding: "35px",
    border: "1px solid rgba(212,175,55,0.12)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
  },

  logoBox: {
    textAlign: "center",
    marginBottom: "30px",
  },

  logo: {
    width: "75px",
    height: "75px",
    objectFit: "cover",
    borderRadius: "18px",
    border: "2px solid #D4AF37",
  },

  title: {
    color: "#D4AF37",
    fontSize: "30px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  subtitle: {
    color: "#aaa",
    fontSize: "14px",
    marginTop: "10px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#101010",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },

  registerButton: {
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#6A0DAD,#8E44AD)",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "10px",
    boxShadow: "0 12px 30px rgba(106,13,173,0.35)",
  },

  loginButton: {
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #D4AF37",
    background: "transparent",
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default RegisterPage;