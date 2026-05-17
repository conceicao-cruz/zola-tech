import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "./firebase/recaptcha";
import app from "./firebase/firebase";
import "./styles/theme.css";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preenche todos os campos");
      return;
    }

    if (!captcha) {
      alert("Confirma que não és um robô");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login realizado com sucesso 🚀");
      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="zola-container">
      <div className="zola-card">

        {/* LOGO */}
        <img src={logo} alt="Zola Tech" className="zola-logo" />

        <h1 className="zola-title">ZOLA TECH</h1>

        <p className="zola-subtitle">
          Acede à tua plataforma de aprendizagem
        </p>

        {/* FORM */}
        <div>

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

          <div className="captcha-container">
  <ReCAPTCHA
    sitekey={RECAPTCHA_SITE_KEY}
    onChange={(value) => setCaptcha(value)}
  />
</div>

          <button
            onClick={handleLogin}
            disabled={!email || !password}
            className="zola-btn-primary"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/register")}
            className="zola-btn-outline"
          >
            Criar Conta
          </button>

          <Link to="/forgot-password" className="zola-link">
            Esqueci a minha palavra-passe
          </Link>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
