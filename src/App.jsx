import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ForgotPassword from "./ForgotPassword.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase/firebase";

import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Dashboard from "./Dashboard.jsx";

const auth = getAuth(app);

/* PROTEÇÃO DE ROTAS */
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#3b1b1b",
          color: "white",
        }}
      >
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* APP */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
