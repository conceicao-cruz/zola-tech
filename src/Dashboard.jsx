import { useEffect, useRef, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import app from "./firebase/firebase";
import { db } from "./firebase/firebase";

import logo from "./assets/logo.jpg";

/* =========================
   🌳 ÁRVORE BINÁRIA
========================= */

class TreeNode {
  constructor(course) {
    this.course = course;
    this.left = null;
    this.right = null;
  }
}

const root = new TreeNode("Programação");

root.left = new TreeNode("Frontend");
root.right = new TreeNode("Backend");

/* =========================
   🔗 LISTA ENCADEADA
========================= */

class LessonNode {
  constructor(title) {
    this.title = title;
    this.next = null;
  }
}

const lesson1 = new LessonNode("Introdução");
const lesson2 = new LessonNode("Variáveis");
const lesson3 = new LessonNode("Funções");

lesson1.next = lesson2;
lesson2.next = lesson3;

/* =========================
   📥 FILA
========================= */

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }
}

/* =========================
   📚 PILHA
========================= */

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}

export default function Dashboard() {
  const auth = getAuth(app);

  const [userData, setUserData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  const questionQueue = useRef(new Queue());
  const navigationStack = useRef(new Stack());

  /* =========================
     USER
  ========================= */

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const ref = doc(db, "users", user.uid);

      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    loadUser();
  }, []);

  /* =========================
     FECHAR MENU
  ========================= */

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
  }, []);

  /* =========================
     LOGOUT
  ========================= */

  const logout = async () => {
    await signOut(auth);

    window.location.href = "/login";
  };

  /* =========================
     CURSOS
  ========================= */

  const courses = [
    {
      name: "Java Avançado",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      link:
        "https://www.coursera.org/learn/desenvolvimento-agil-com-java-avancado",
    },

    {
      name: "Java Iniciantes",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      link:
        "https://www.coursera.org/learn/java-for-programming-beginners",
    },

    {
      name: "HTML & CSS",
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link:
        "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
    },

    {
      name: "JavaScript",
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      link:
        "https://www.coursera.org/search?query=javascript",
    },

    {
      name: "React JS",
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      link:
        "https://www.coursera.org/search?query=react",
    },

    {
      name: "Python",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      link:
        "https://www.coursera.org/search?query=python",
    },

    {
      name: "Linux Básico",
      category: "DevOps",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      link:
        "https://www.netacad.com/courses/linux-unhatched?courseLang=pt-BR",
    },

    {
      name: "Linux Intermédio",
      category: "DevOps",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      link:
        "https://www.netacad.com/courses/linux-essentials?courseLang=en-US",
    },

    {
      name: "Redes Cisco",
      category: "Redes",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      link:
        "https://www.netacad.com/courses/networking-basics?courseLang=pt-BR",
    },

    {
      name: "Cibersegurança",
      category: "Segurança",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      link:
        "https://www.netacad.com/catalogs/learn/cybersecurity",
    },

    {
      name: "React Native",
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      link:
        "https://www.coursera.org/search?query=react%20native",
    },

    {
      name: "Python Data Science",
      category: "IA & Data",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link:
        "https://www.coursera.org/search?query=data%20science",
    },

    {
      name: "Git e GitHub",
      category: "DevOps",
      image:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
      link:
        "https://cursa.com.br/home/courses?query=git",
    },

    {
      name: "Cloud Computing",
      category: "Cloud",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link:
        "https://www.netacad.com/catalogs/learn/cloud",
    },

    {
      name: "Inteligência Artificial",
      category: "IA & Data",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      link:
        "https://www.coursera.org/search?query=artificial%20intelligence",
    },

    {
      name: "UI/UX Design",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
      link:
        "https://www.coursera.org/search?query=ui%20ux",
    },

    {
      name: "Flutter",
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1516321310764-8d5d5c3c2d4d",
      link:
        "https://www.coursera.org/search?query=flutter",
    },

    {
      name: "Node.js",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      link:
        "https://www.coursera.org/search?query=nodejs",
    },

    {
      name: "MySQL",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
      link:
        "https://www.coursera.org/search?query=mysql",
    },

    {
      name: "MongoDB",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
      link:
        "https://www.coursera.org/search?query=mongodb",
    },
  ];

  /* =========================
     VIDEOAULAS
  ========================= */

  const videos = [
    {
      title: "HTML e CSS",
      duration: "4h 30m",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link:
        "https://www.youtube.com/watch?v=Ejkb_YpuHWs",
    },

    {
      title: "JavaScript",
      duration: "6h 15m",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      link:
        "https://www.youtube.com/watch?v=hdI2bqOjy3c",
    },

    {
      title: "React JS",
      duration: "8h 00m",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      link:
        "https://www.youtube.com/watch?v=bMknfKXIFA8",
    },

    {
      title: "Python",
      duration: "5h 45m",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      link:
        "https://www.youtube.com/watch?v=rfscVS0vtbw",
    },

    {
      title: "Java",
      duration: "7h 20m",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      link:
        "https://www.youtube.com/watch?v=eIrMbAQSU34",
    },

    {
      title: "Linux",
      duration: "3h 50m",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      link:
        "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
    },
  ];
const progress =
Math.floor((videos.length / courses.length) * 100);
  return (

    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logoBox}>
          <img
            src={logo}
            alt="logo"
            style={styles.logo}
          />

          <h2 style={styles.brand}>
            ZOLA TECH
          </h2>
        </div>

        <div style={{ display: "flex", gap: 15 }}>
         
          {/* AVATAR */}
          <div style={{ position: "relative" }}>
            <div
              style={styles.avatar}
              onClick={() =>
                setShowMenu(!showMenu)
              }
            >
              {userData?.name
                ?.charAt(0)
                .toUpperCase() || "U"}
            </div>

            {showMenu && (
              <div
                ref={menuRef}
                style={styles.menu}
              >
                <h3>
                  {userData?.name ||
                    "Utilizador"}
                </h3>

                <p style={{ fontSize: 13 }}>
                  {userData?.email}
                </p>

                <button style={styles.menuBtn}>
                  👤 Perfil
                </button>

                <button style={styles.menuBtn}>
                  📚 Cursos
                </button>

                <button style={styles.menuBtn}>
                  🎥 Videoaulas
                </button>

                <button
                  style={styles.logoutBtn}
                  onClick={logout}
                >
                  🚪 Terminar Sessão
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.heroCard}>
        <div>
         
<h1 style={styles.title}>
  ✦ Bem-vindo, {userData?.name?.split(" ")[0] || "Utilizador"} 👋
</h1>
          <p style={styles.subtitle}>
            Aprende programação numa
            plataforma moderna e premium
          </p>

          <p style={styles.phrase}>
            “O teu futuro começa hoje.”
          </p>

          <div style={styles.progressBox}>
            <div style={styles.progressCard}>
              <h2>0%</h2>
              <p>Progresso Geral</p>
            </div>

            <div style={styles.progressCard}>
              <h2>20</h2>
              <p>Total Cursos</p>
            </div>

            <div style={styles.progressCard}>
              <h2>6</h2>
              <p>Videoaulas</p>
            </div>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div style={styles.infoBox}>
        <div style={styles.infoCard}>
          📚
          <h3>+120 Cursos</h3>
        </div>

        <div style={styles.infoCard}>
          🎥
          <h3>Videoaulas</h3>
        </div>

        <div style={styles.infoCard}>
          🌍
          <h3>Cursos Reais</h3>
        </div>

        <div style={styles.infoCard}>
          🚀
          <h3>Premium</h3>
        </div>
      </div>

      {/* CURSOS */}
      <h2 style={styles.section}>
        📚 Cursos Premium
      </h2>

      <div style={styles.grid}>
        {courses.map((course, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              backgroundImage: `url(${course.image})`,
            }}
            onClick={() => {
              navigationStack.current.push(
                course.name
              );

              window.open(
                course.link,
                "_blank"
              );
            }}
          >
            <div style={styles.overlay}>
              <span style={styles.category}>
                {course.category}
              </span>

              <h3>{course.name}</h3>

              <button style={styles.watchBtn}>
                Abrir Curso
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIDEOAULAS */}
      <h2 style={styles.section}>
        🎥 Videoaulas Premium
      </h2>

      <div style={styles.grid}>
        {videos.map((video, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              backgroundImage: `url(${video.image})`,
            }}
            onClick={() => {
              questionQueue.current.enqueue(
                video.title
              );

              window.open(
                video.link,
                "_blank"
              );
            }}
          >
            <div style={styles.overlay}>
              <span style={styles.duration}>
                ⏱ {video.duration}
              </span>

              <h3>{video.title}</h3>

              <button style={styles.watchBtn}>
                ▶ Assistir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <h3>ZOLA TECH © 2026</h3>
<h3>Criada por:Conceição Da Cruz</h3>
        <p>
          Plataforma premium de
          programação e tecnologia
        </p>
      </div>
    </div>
  );
}

/* =========================
   🎨 STYLES
========================= */

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#050505,#12091d)",
    color: "white",
    fontFamily: "Arial",
    paddingBottom: 50,
  },

 
header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 25px",
  background: "#000",
  borderBottom:
    "1px solid rgba(212,175,55,0.2)",
  position: "sticky",
  top: 0,
  zIndex: 100,
  flexWrap: "wrap",
  gap: 15,
},
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    border:
      "2px solid #D4AF37",
  },

  brand: {
    color: "#D4AF37",
    letterSpacing: 1,
    fontSize: 24,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#6A0DAD,#D4AF37)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
  },

  menu: {
    position: "absolute",
    right: 0,
    top: 60,
    width: 240,
    background: "#111",
    padding: 15,
    borderRadius: 15,
    border:
      "1px solid rgba(212,175,55,0.2)",
    zIndex: 20,
  },

  menuBtn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "none",
    borderRadius: 10,
    background: "#1c1c1c",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
  },

  logoutBtn: {
    width: "100%",
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(135deg,#6A0DAD,#D4AF37)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  exitBtn: {
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    cursor: "pointer",
    color: "white",
    background:
      "linear-gradient(135deg,#6A0DAD,#D4AF37)",
    fontWeight: "bold",
  },

  heroCard: {
    margin: 20,
    padding: 40,
    borderRadius: 25,
    background:
      "linear-gradient(135deg,#1c0b2e,#0f0f0f)",
    border:
      "1px solid rgba(212,175,55,0.2)",
    boxShadow:
      "0 0 25px rgba(106,13,173,0.3)",
  },

 title: {
  fontSize: "clamp(32px, 6vw, 52px)",
  marginBottom: 15,
  lineHeight: 1.1,
  fontWeight: "bold",
},
 subtitle: {
  opacity: 0.85,
  fontSize: "clamp(16px, 3vw, 22px)",
  maxWidth: 700,
  lineHeight: 1.6,
},

  phrase: {
    color: "#D4AF37",
    marginTop: 15,
    fontStyle: "italic",
    fontSize: 18,
  },

  progressBox: {
    display: "flex",
    gap: 20,
    marginTop: 30,
    flexWrap: "wrap",
  },

  progressCard: {
    background: "#111",
    padding: 20,
    borderRadius: 18,
    minWidth: 160,
    border:
      "1px solid rgba(212,175,55,0.2)",
  },

  infoBox: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: 20,
    padding: 20,
  },

  infoCard: {
    height: 120,
    background: "#111",
    borderRadius: 20,
    border:
      "1px solid rgba(212,175,55,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
  },

  section: {
    padding: "10px 20px",
    color: "#D4AF37",
    fontSize: 32,
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: 25,
    padding: 20,
  },

  card: {
  height: 360,
  borderRadius: 24,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  transition: "0.4s ease",
  border:
    "1px solid rgba(212,175,55,0.2)",
  boxShadow:
    "0 0 20px rgba(0,0,0,0.5)",
},



  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(transparent,rgba(0,0,0,0.95))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
   padding: "20px 20px 28px 20px",
  },

  category: {
    background: "#6A0DAD",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    width: "fit-content",
    marginBottom: 10,
  },

  duration: {
    background: "#D4AF37",
    color: "#000",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    width: "fit-content",
    marginBottom: 10,
    fontWeight: "bold",
  },

  watchBtn: {
    marginTop: 12,
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    background:
      "linear-gradient(135deg,#6A0DAD,#D4AF37)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
  },

  footer: {
    marginTop: 50,
    textAlign: "center",
    opacity: 0.7,
    padding: 20,
  },
};