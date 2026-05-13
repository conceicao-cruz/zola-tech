import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

import { db } from "./firebase/firebase";
import app from "./firebase/firebase";
import logo from "./assets/logo.jpg";

export default function Dashboard() {
  const auth = getAuth(app);

  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     CARREGAR USER
  ========================= */
  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      // cria user se não existir
      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.email.split("@")[0],
          email: user.email,
          role: "student",
          progress: {
            coursesDone: 0,
            videosWatched: 0,
            totalCourses: 20,
            totalVideos: 6
          }
        });
      }

      const data = (await getDoc(ref)).data();

      setUserData(data);
      setProgress(data?.progress || {
        coursesDone: 0,
        videosWatched: 0,
        totalCourses: 20,
        totalVideos: 6
      });

      setLoading(false);
    };

    load();
  }, []);

  /* =========================
     LOGOUT
  ========================= */
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  /* =========================
     CURSO CONCLUÍDO (SEGURO)
  ========================= */
  const finishCourse = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
      "progress.coursesDone": increment(1)
    });

    setProgress((prev) => ({
      ...prev,
      coursesDone: prev.coursesDone + 1
    }));
  };

  /* =========================
     VIDEO VISTO (SEGURO)
  ========================= */
  const watchVideo = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
      "progress.videosWatched": increment(1)
    });

    setProgress((prev) => ({
      ...prev,
      videosWatched: prev.videosWatched + 1
    }));
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        Carregando dashboard...
      </div>
    );
  }

  const percent = Math.floor(
    (progress.coursesDone / progress.totalCourses) * 100
  );

  const isAdmin = userData?.role === "admin";

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <img src={logo} style={styles.logo} />
        <h2>
          ZOLA TECH {isAdmin && "👑"}
        </h2>

        <button onClick={logout} style={styles.logout}>
          Sair
        </button>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1>Olá {userData?.name}</h1>

        <p>Progresso geral: {percent}%</p>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.fill,
              width: percent + "%"
            }}
          />
        </div>

        <p>
          📚 Cursos: {progress.coursesDone}/
          {progress.totalCourses}
        </p>

        <p>
          🎥 Vídeos: {progress.videosWatched}/
          {progress.totalVideos}
        </p>
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button onClick={finishCourse}>
          + Curso concluído
        </button>

        <button onClick={watchVideo}>
          + Vídeo visto
        </button>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "white",
    padding: 20
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: { width: 50 },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: 10
  },

  hero: {
    marginTop: 30,
    background: "#111",
    padding: 20,
    borderRadius: 15
  },

  progressBar: {
    width: "100%",
    height: 10,
    background: "#333",
    borderRadius: 10,
    marginTop: 10
  },

  fill: {
    height: "100%",
    background: "gold",
    borderRadius: 10
  },

  actions: {
    marginTop: 20,
    display: "flex",
    gap: 10
  }
};