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
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
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

      {/* HEADER MINIMALISTA */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.header>

      {/* HERO APPLE STYLE */}
      <motion.main
        style={styles.main}
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.h1 style={styles.title} variants={fadeUp}>
          Aprenda Tecnologia de Forma Simples
        </motion.h1>

        <motion.p style={styles.subtitle} variants={fadeUp}>
          Uma plataforma moderna para quem quer evoluir na tecnologia de forma
          clara, prática e consistente.
        </motion.p>

        {/* CARDS CLEAN */}
        <div style={styles.cardsContainer}>
          <motion.div style={styles.card} variants={fadeUp}>
            <h2 style={styles.cardTitle}>O que é?</h2>
            <p style={styles.cardText}>
              Plataforma simples para aprender tecnologia passo a passo.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp}>
            <h2 style={styles.cardTitle}>Como funciona?</h2>
            <p style={styles.cardText}>
              Conteúdos organizados e orientação prática para evolução contínua.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp}>
            <h2 style={styles.cardTitle}>Para quem?</h2>
            <p style={styles.cardText}>
              Iniciantes e pessoas que querem melhorar suas habilidades tech.
            </p>
          </motion.div>
        </div>

        {/* CTA PRINCIPAL */}
        <motion.button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Começar Agora
        </motion.button>

        <p style={styles.bottomText}>Simples. Limpo. Focado em evolução.</p>
      </motion.main>
    </div>
  );
}

/* ===================== STYLES APPLE ===================== */
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
    borderRadius: "12px",
    fontWeight: "600",
  },

  main: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "40px 16px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  },

  title: {
    fontSize: "clamp(28px, 7vw, 52px)",
    fontWeight: "600",
    color: "#D4AF37",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },

  subtitle: {
    fontSize: "16px",
    maxWidth: "600px",
    color: "#ddd",
    lineHeight: "1.6",
  },

  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    maxWidth: "420px",
    marginTop: "20px",
  },

  card: {
    background: "rgba(20,20,20,0.55)",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "left",
    border: "1px solid rgba(255,255,255,0.08)",
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
    marginTop: "20px",
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "14px",
    fontWeight: "600",
    fontSize: "16px",
  },

  bottomText: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#D4AF37",
  },
};

export default LandingPage;