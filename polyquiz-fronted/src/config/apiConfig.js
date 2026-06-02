// Configuration de l'API Backend
export const API_BASE_URL = "http://localhost:5001/api";

// Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  QUESTIONS: `${API_BASE_URL}/questions`,
  SCORE: `${API_BASE_URL}/users/score`,
  LEADERBOARD: `${API_BASE_URL}/leaderboard`,
};

// Clé pour stocker le token dans localStorage
export const STORAGE_KEYS = {
  TOKEN: "polyquiz_token",
  PSEUDO: "polyquiz_pseudo",
};
