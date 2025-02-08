import { jwtDecode } from "jwt-decode";

export interface JWTPayload {
  sub: string;
  email: string;
  role: "admin" | "user" | "operator";
  exp: number;
}

export const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};
