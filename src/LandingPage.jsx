import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  }, [images.length]);

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${images[index]})`,
      }}
    >
      <div style={styles.overlay} />

      {/* HEADER */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.logoBox}>
          <img src={logo} style={styles.logoImg} />
          <span style={styles.logoText}>ZOLA TECH</span>
        </div>

        <button
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Entrar
        </button>
      </motion.header>

      {/* MAIN */}
      <motion.main style={styles.main} initial="hidden" animate="show">
        {/* HERO */}
        <motion.h1 style={styles.title} variants={fadeUp}>
          Aprenda Tecnologia de Forma Moderna
        </motion.h1>

        <motion.p style={styles.subtitle} variants={fadeUp}>
          Uma plataforma pensada para evolução real em tecnologia, de forma simples,
          prática e organizada.
        </motion.p>

        {/* GRID RESPONSIVO */}
        <div style={styles.cardsContainer}>
          <motion.div style={styles.card} variants={fadeUp} whileHover={hover}>
            <h3 style={styles.cardTitle}>O que é?</h3>
            <p style={styles.cardText}>
              Plataforma de aprendizagem moderna com conteúdos organizados.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp} whileHover={hover}>
            <h3 style={styles.cardTitle}>Como funciona?</h3>
            <p style={styles.cardText}>
              Aprendes passo a passo com orientação prática e exercícios.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp} whileHover={hover}>
            <h3 style={styles.cardTitle}>Para quem?</h3>
            <p style={styles.cardText}>
              Iniciantes e pessoas que querem melhorar habilidades tech.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp} whileHover={hover}>
            <h3 style={styles.cardTitle}>Objetivo</h3>
            <p style={styles.cardText}>
              Tornar o aprendizado simples, acessível e contínuo.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Começar Agora
        </motion.button>

        <p style={styles.bottomText}>Simples. Limpo. Responsivo.</p>
      </motion.main>
    </div>
  );
}

/* HOVER EFFECT */
const hover = {
  scale: 1.03,
  boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
};

/* STYLES CHATGPT RESPONSIVO */
const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.92))",
  },

  header: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoImg: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
  },

  logoText: {
    color: "#D4AF37",
    fontWeight: "600",
    fontSize: "14px",
  },

  loginButton: {
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: "600",
  },

  main: {
    position: "relative",
    zIndex: 2,
    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: "clamp(16px, 4vw, 60px)",
    gap: "20px",
  },

  title: {
    fontSize: "clamp(24px, 5vw, 52px)",
    fontWeight: "600",
    textAlign: "center",
    color: "#D4AF37",
    maxWidth: "900px",
    lineHeight: "1.1",
  },

  subtitle: {
    fontSize: "clamp(14px, 2vw, 18px)",
    maxWidth: "700px",
    textAlign: "center",
    color: "#ddd",
    lineHeight: "1.6",
  },

  cardsContainer: {
    width: "100%",
    maxWidth: "1000px",

    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",

    padding: "0 12px",
  },

  card: {
    background: "rgba(20,20,20,0.55)",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "left",
  },

  cardTitle: {
    color: "#D4AF37",
    fontSize: "16px",
    marginBottom: "6px",
  },

  cardText: {
    color: "#ccc",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  mainButton: {
    marginTop: "10px",
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
  },

  bottomText: {
    fontSize: "13px",
    color: "#D4AF37",
  },
};

export default LandingPage;