import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { API_ENDPOINTS, STORAGE_KEYS } from "../config/apiConfig";

const Results = () => {
  const { pseudo, finalScore, totalQuestions, bestScore } = useUser();
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    const sendScore = async () => {
      if (finalScore > 0 && !scoreSaved) {
        try {
          const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
          await fetch(API_ENDPOINTS.SCORE, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ score: finalScore }),
          });
          setScoreSaved(true);
        } catch (err) {
          console.error("Erreur lors de l'envoi du score:", err);
        }
      }
    };
    sendScore();
  }, [finalScore, scoreSaved]);

  const ratio = useMemo(() => {
    return totalQuestions > 0
      ? ((finalScore / totalQuestions) * 100).toFixed(2)
      : 0;
  }, [finalScore, totalQuestions]);

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>Résultats</h1>
        <h2>{pseudo || "Joueur"}</h2>
        <p>
          Score : {finalScore} / {totalQuestions}
        </p>
        <p>Ratio de bonnes réponses : {ratio}%</p>
        <p>Meilleur score : {bestScore}</p>
        <Link to="/leaderboard">
          <button>Voir le classement</button>
        </Link>
        <br />
        <Link to="/quiz">
          <button>Rejouer</button>
        </Link>
        <br />
        <Link to="/">
          <button>Retour à l'accueil</button>
        </Link>
      </div>
    </div>
  );
};

export default Results;
