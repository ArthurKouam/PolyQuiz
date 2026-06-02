import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { API_ENDPOINTS, STORAGE_KEYS } from "../config/apiConfig";

const Home = () => {
  const [inputPseudo, setInputPseudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setPseudo, setBestScore } = useUser();
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    setError("");

    if (!inputPseudo.trim()) {
      setError("Le pseudo est obligatoire");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: inputPseudo.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erreur de connexion");
      }

      const { token, pseudo, bestScore } = await response.json();

      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.PSEUDO, pseudo);
      setPseudo(pseudo);
      setBestScore(bestScore || 0);
      navigate("/quiz");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>PolyQuiz</h1>
        <p>Testez vos connaissances avec notre quiz !</p>
        <form onSubmit={handleStart}>
          <input
            type="text"
            placeholder="Entrez votre pseudo"
            value={inputPseudo}
            onChange={(e) => setInputPseudo(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Commencer le quiz"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Home;
