import { Suspense, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { wsClient } from "@/lib/websocket";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import GithubCallback from "./components/auth/GithubCallback";
import routes from "tempo-routes";

function App() {
  useEffect(() => {
    wsClient.connect();
    return () => wsClient.disconnect();
  }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/api/auth/callback/github"
              element={<GithubCallback />}
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
