import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpg";
import "./styles/theme.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Insere o teu email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email de recuperação enviado! Verifica o spam.");
    } catch (error) {
      console.log(error);
      setMessage("Erro ao enviar email");
    }
  };

  return (
    <div className="zola-container">
      <div className="zola-card">

        <img src={logo} alt="Logo" className="zola-logo" />

        <h1 className="zola-title">ZOLA TECH</h1>

        <p className="zola-subtitle">
          Recupera a tua conta
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="zola-input"
          />

          <button type="submit" className="zola-btn-primary">
            Enviar link
          </button>
        </form>

        {message && (
          <p className="zola-subtitle">{message}</p>
        )}

        <Link to="/login" className="zola-btn-outline forgot-back">
  Voltar ao login
</Link>
      </div>
    </div>
  );
}