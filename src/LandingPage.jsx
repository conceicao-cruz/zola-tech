import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./assets/logo.jpg";
import img1 from "./assets/foto3.jpg";
import img2 from "./assets/foto1.jpg";
import img3 from "./assets/foto2.jpg";

function LandingPage() {
  const navigate = useNavigate();

  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    setVisible(true);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${images[index]})`,
      }}
    >
      {/* OVERLAY */}
      <div style={styles.overlay} />

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoBox}>
          <img src={logo} alt="Zola Tech" style={styles.logoImg} />
          <span style={styles.logoText}>ZOLA TECH</span>
        </div>

        <button
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Entrar
        </button>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          Aprenda Tecnologia de Forma Moderna
        </h1>

        <p style={styles.subtitle}>
          Uma plataforma digital pensada para quem quer evoluir na tecnologia,
          seja iniciante ou alguém que já está no mundo digital e procura
          orientação, prática e estrutura para crescer com consistência.
        </p>

        {/* CARDS */}
        <div style={styles.cardsContainer}>

          <div style={{ ...styles.card, opacity: visible ? 1 : 0 }}>
            <h2 style={styles.cardTitle}>O que é a Zola Tech?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              É uma plataforma de aprendizagem moderna que organiza conteúdos
              de tecnologia de forma simples, prática e acessível. O objetivo
              é ajudar qualquer pessoa a aprender de forma estruturada e sem
              confusão.
            </p>
          </div>

          <div style={{ ...styles.card, opacity: visible ? 1 : 0 }}>
            <h2 style={styles.cardTitle}>Como funciona?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              O utilizador escolhe um caminho de aprendizagem e recebe conteúdos
              organizados, explicações claras, exercícios práticos e uma evolução
              contínua com base no seu nível.
            </p>
          </div>

          <div style={{ ...styles.card, opacity: visible ? 1 : 0 }}>
            <h2 style={styles.cardTitle}>Para quem é?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Para iniciantes que querem entrar no mundo da tecnologia, e também
              para pessoas com experiência que procuram reforçar conhecimentos,
              melhorar habilidades ou encontrar direção nos estudos.
            </p>
          </div>

        </div>

        {/* BOTÃO */}
        <button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
        >
          Começar Agora
        </button>

        <p style={styles.bottomText}>
          Simples. Moderno. Feito para evolução real.
        </p>
      </main>
    </div>
  );
}

const styles = {
  container: {
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  fontFamily: "Arial, sans-serif",
  color: "white",
}
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.78)",
  },

  /* HEADER FIX (não centralizado) */
  header: {
  position: "relative",
  zIndex: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  width: "100%",
  boxSizing: "border-box",
},

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoImg: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    border: "2px solid #D4AF37",
  },

  logoText: {
    color: "#D4AF37",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  loginButton: {
    background: "linear-gradient(135deg, #6A0DAD, #8E44AD)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* MAIN */
 main: {
  position: "relative",
  zIndex: 2,
  width: "100%",
  padding: "60px 20px 100px",
  textAlign: "center",
  boxSizing: "border-box",
},
  title: {
    fontSize: "clamp(34px, 6vw, 64px)",
    color: "#D4AF37",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  subtitle: {
  fontSize: "16px",
  color: "#ddd",
  width: "100%",
  maxWidth: "750px",
  margin: "0 auto 50px",
  lineHeight: "1.8",
},

  /* CARDS VERTICAIS PREMIUM */
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    marginBottom: "50px",
  },

  card: {
    background: "rgba(20,20,20,0.70)",
    padding: "28px",
    borderRadius: "18px",
    border: "1px solid rgba(212,175,55,0.15)",
    textAlign: "left",
    backdropFilter: "blur(10px)",

    /* efeito suave */
    transition: "all 0.4s ease",
  },

  cardTitle: {
    fontSize: "20px",
    color: "#D4AF37",
    marginBottom: "10px",
  },

  line: {
    width: "60px",
    height: "2px",
    background: "linear-gradient(90deg, #D4AF37, #8E44AD)",
    marginBottom: "15px",
    borderRadius: "10px",
  },

  cardText: {
    fontSize: "15px",
    color: "#ccc",
    lineHeight: "1.8",
  },

  mainButton: {
    background: "linear-gradient(135deg, #6A0DAD, #8E44AD)",
    border: "none",
    padding: "16px 34px",
    borderRadius: "14px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  bottomText: {
    marginTop: "18px",
    color: "#D4AF37",
    fontSize: "13px",
  },
};

export default LandingPage;