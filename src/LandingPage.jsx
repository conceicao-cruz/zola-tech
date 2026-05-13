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

  // slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // animações
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
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

      {/* MAIN */}
      <motion.main
        style={styles.main}
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        {/* HERO */}
        <motion.h1 style={styles.title} variants={fadeUp}>
          Aprenda Tecnologia de Forma Moderna
        </motion.h1>

        <motion.p style={styles.subtitle} variants={fadeUp}>
          Uma plataforma digital pensada para quem quer evoluir na tecnologia,
          seja iniciante ou alguém que já está no mundo digital.
        </motion.p>

        {/* CARDS */}
        <motion.div
          style={styles.cardsContainer}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div style={styles.card} variants={fadeUp} whileHover={hoverCard}>
            <h2 style={styles.cardTitle}>O que é a Zola Tech?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Plataforma de aprendizagem moderna com conteúdos organizados de forma simples.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp} whileHover={hoverCard}>
            <h2 style={styles.cardTitle}>Como funciona?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Escolha um caminho e receba conteúdos, exercícios e orientação prática.
            </p>
          </motion.div>

          <motion.div style={styles.card} variants={fadeUp} whileHover={hoverCard}>
            <h2 style={styles.cardTitle}>Para quem é?</h2>
            <div style={styles.line}></div>
            <p style={styles.cardText}>
              Para iniciantes e pessoas que querem evoluir na tecnologia.
            </p>
          </motion.div>
        </motion.div>

        {/* BOTÃO PRINCIPAL */}
        <motion.button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Começar Agora
        </motion.button>

        <p style={styles.bottomText}>
          Simples. Moderno. Feito para evolução real.
        </p>
      </motion.main>
    </div>
  );
}

/* HOVER CARD */
const hoverCard = {
  scale: 1.03,
  boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  transition: { duration: 0.3 },
};

/* STYLES */
const styles = {
 container: {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  overflow: "hidden",
}

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle, rgba(0,0,0,0.4), rgba(0,0,0,0.92))",
  },

  header: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
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
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "clamp(28px, 7vw, 60px)",
    color: "#D4AF37",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "700px",
    margin: "0 auto 30px",
    color: "#ddd",
  },

  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxWidth: "520px",
    margin: "0 auto",
  },

  card: {
    background: "rgba(20,20,20,0.65)",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "left",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(212,175,55,0.15)",
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
    color: "#ccc",
    lineHeight: "1.6",
  },

  mainButton: {
    marginTop: "25px",
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
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