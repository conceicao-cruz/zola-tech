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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${images[index]})`,
      }}
    >
      <div style={styles.overlay}></div>

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

      <main style={styles.main}>
        <h1 style={styles.title}>
          Aprenda Tecnologia de Forma Moderna
        </h1>

        <p style={styles.subtitle}>
          Uma plataforma digital pensada para quem quer evoluir na tecnologia,
          seja iniciante ou alguém que já está no mundo digital e procura
          orientação, prática e estrutura para crescer com consistência.
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>O que é a Zola Tech?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Plataforma de aprendizagem moderna que organiza conteúdos de
              tecnologia de forma simples e prática.
            </p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Como funciona?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Escolha um caminho de aprendizagem e receba conteúdos,
              exercícios e orientação para evoluir continuamente.
            </p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Para quem é?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Para iniciantes e também para pessoas que desejam melhorar
              as suas competências tecnológicas.
            </p>
          </div>
        </div>

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
    position: "relative",
    width: "100%",
    minHeight: "100vh",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    overflowX: "hidden",

    fontFamily: "Arial, sans-serif",
    color: "#fff",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.78)",
  },

  header: {
    position: "relative",
    zIndex: 2,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "15px",
    width: "100%",
    boxSizing: "border-box",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoImg: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    border: "2px solid #D4AF37",
  },

  logoText: {
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: "16px",
  },

  loginButton: {
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  main: {
    position: "relative",
    zIndex: 2,

    width: "100%",
    padding: "20px",
    boxSizing: "border-box",

    textAlign: "center",
  },

  title: {
    fontSize: "clamp(28px, 7vw, 60px)",
    color: "#D4AF37",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "30px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(20,20,20,0.75)",
    borderRadius: "15px",
    padding: "18px",
    textAlign: "left",
    backdropFilter: "blur(8px)",
  },

  cardTitle: {
    color: "#D4AF37",
    fontSize: "18px",
    marginBottom: "8px",
  },

  line: {
    width: "50px",
    height: "2px",
    background: "#D4AF37",
    marginBottom: "12px",
  },

  cardText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ddd",
  },

  mainButton: {
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  bottomText: {
    marginTop: "15px",
    color: "#D4AF37",
    fontSize: "13px",
  },
};

export default LandingPage;