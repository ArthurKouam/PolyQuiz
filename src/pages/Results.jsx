import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Results = () => {
  const { pseudo, finalScore, totalQuestions, bestScore } = useUser();

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
