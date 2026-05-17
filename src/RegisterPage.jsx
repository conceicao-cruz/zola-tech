import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import "./styles/theme.css";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Preenche todos os campos");
      return;
    }

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      alert("Conta criada com sucesso 🚀");
      navigate("/dashboard");

    } catch (error) {
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
    <div className="zola-container">
      <div className="zola-card">

        <img src={logo} alt="Zola Tech" className="zola-logo" />

        <h1 className="zola-title">ZOLA TECH</h1>

        <p className="zola-subtitle">Cria a tua conta</p>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="zola-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="zola-input"
        />

        <input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="zola-input"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="zola-btn-primary"
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>

        <button
          onClick={() => navigate("/login")}
          className="zola-btn-outline"
        >
          Já tenho conta
        </button>

      </div>
    </div>
  );
}

export default RegisterPage;