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
      transition: { duration: 0.8 },
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

        <button style={styles.loginButton} onClick={() => navigate("/login")}>
          Entrar
        </button>
      </motion.header>

      {/* MAIN */}
      <motion.main style={styles.main} initial="hidden" animate="show">

        {/* HERO */}
        <motion.h1 style={styles.title} variants={fadeUp}>
          Aprenda Tecnologia com Direção
        </motion.h1>

        <motion.p style={styles.subtitle} variants={fadeUp}>
          A Zola Tech ajuda jovens a descobrir carreiras em tecnologia e seguir
          trilhos estruturados de aprendizagem para o mercado digital.
        </motion.p>

        <motion.button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Começar Agora
        </motion.button>

        {/* O QUE É */}
        <motion.section style={styles.section} variants={fadeUp}>
          <h2 style={styles.sectionTitle}>O que é a Zola Tech?</h2>
          <p style={styles.sectionText}>
            Uma plataforma de orientação tecnológica com trilhos estruturados,
            feita para estudantes e iniciantes que querem entrar no mundo tech.
          </p>
        </motion.section>

        {/* COMO FUNCIONA */}
        <motion.section style={styles.section} variants={fadeUp}>
          <h2 style={styles.sectionTitle}>Como Funciona?</h2>

          <div style={styles.steps}>
            <div style={styles.stepCard}>Criar conta</div>
            <div style={styles.stepCard}>Escolher trilho</div>
            <div style={styles.stepCard}>Aprender conteúdos</div>
            <div style={styles.stepCard}>Acompanhar progresso</div>
          </div>
        </motion.section>

        {/* TRILHOS */}
        <motion.section style={styles.section} variants={fadeUp}>
          <h2 style={styles.sectionTitle}>Trilhos Disponíveis</h2>

          <div style={styles.cardsContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Frontend</h3>
              <p style={styles.cardText}>HTML, CSS, JavaScript, React</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Backend</h3>
              <p style={styles.cardText}>Java, APIs e servidores</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Bases de Dados</h3>
              <p style={styles.cardText}>SQL e modelação de dados</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Inteligência Artificial</h3>
              <p style={styles.cardText}>Fundamentos de IA</p>
            </div>
          </div>
        </motion.section>

        {/* PARA QUEM */}
        <motion.section style={styles.section} variants={fadeUp}>
          <h2 style={styles.sectionTitle}>Para Quem é?</h2>

          <div style={styles.cardsContainer}>
            <div style={styles.card}>Estudantes</div>
            <div style={styles.card}>Universitários</div>
            <div style={styles.card}>Iniciantes</div>
            <div style={styles.card}>Mudança de carreira</div>
          </div>
        </motion.section>

        {/* CTA FINAL */}
        <motion.button
          style={styles.mainButton}
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
        >
          Criar Conta Gratuitamente
        </motion.button>

        <p style={styles.bottomText}>Aprender. Evoluir. Crescer.</p>
      </motion.main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2026 Zola Tech</p>
      </footer>
    </div>
  );
}

/* ================= STYLES RESPONSIVOS ================= */

const styles = {
  container: {
    position: "relative",
    minHeight: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
  },

  header: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    flexWrap: "wrap",
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
    fontWeight: "bold",
    fontSize: "14px",
  },

  loginButton: {
    background: "#8E44AD",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  main: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "20px 16px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },

  title: {
    fontSize: "clamp(22px, 5vw, 48px)",
    color: "#D4AF37",
    fontWeight: "600",
    lineHeight: "1.2",
    maxWidth: "900px",
  },

  subtitle: {
    maxWidth: "700px",
    color: "#ddd",
    fontSize: "clamp(14px, 2vw, 18px)",
    lineHeight: "1.6",
  },

  section: {
    marginTop: "30px",
    width: "100%",
    maxWidth: "1100px",
  },

  sectionTitle: {
    color: "#D4AF37",
    marginBottom: "15px",
    fontSize: "clamp(18px, 3vw, 28px)",
  },

  sectionText: {
    maxWidth: "700px",
    margin: "0 auto",
    color: "#ccc",
    lineHeight: "1.7",
  },

  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    padding: "0 10px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
  },

  cardTitle: {
    color: "#D4AF37",
    marginBottom: "5px",
  },

  cardText: {
    color: "#ccc",
    fontSize: "13px",
  },

  stepCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "14px",
    borderRadius: "12px",
    color: "#fff",
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "10px",
    padding: "0 10px",
  },

  mainButton: {
    marginTop: "20px",
    background: "#8E44AD",
    color: "#fff",
    padding: "14px 22px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "300px",
    cursor: "pointer",
  },

  bottomText: {
    marginTop: "10px",
    color: "#D4AF37",
    fontSize: "13px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#aaa",
    marginTop: "40px",
  },
};

export default LandingPage;