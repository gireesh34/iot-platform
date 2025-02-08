import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleGithubCallback } from "@/lib/auth";

const GithubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || !state) {
        navigate("/login");
        return;
      }

      try {
        await handleGithubCallback(code, state);
        // On successful authentication, redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Completing authentication...</p>
    </div>
  );
};

export default GithubCallback;
