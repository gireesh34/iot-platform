export const GITHUB_CLIENT_ID = "Ov23liQT56ne3xh7JnMr";
export const GITHUB_REDIRECT_URI =
  "https://app.perceive.space/api/auth/callback/github";

export const initiateGithubAuth = () => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: "read:user user:email",
    state: crypto.randomUUID(), // Add state for security
  });

  // Store the state in sessionStorage to verify when the user returns
  sessionStorage.setItem("githubOAuthState", params.get("state") || "");

  window.location.href = `https://github.com/login/oauth/authorize?${params}`;
};

// Function to handle the OAuth callback
import { setToken } from "./jwt";

export const handleGithubCallback = async (code: string, state: string) => {
  // Verify the state matches what we stored
  const storedState = sessionStorage.getItem("githubOAuthState");
  if (state !== storedState) {
    throw new Error("Invalid state parameter");
  }

  // Clear the stored state
  sessionStorage.removeItem("githubOAuthState");

  try {
    // Exchange the code for an access token
    const response = await fetch("https://app.perceive.space/api/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const data = await response.json();
    if (data.token) {
      setToken(data.token);
    }
    return data;
  } catch (error) {
    console.error("Error during GitHub authentication:", error);
    throw error;
  }
};
