import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../config/apiConfig";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.LEADERBOARD);
        if (!response.ok) {
          throw new Error("Impossible de charger le classement");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <h1 className="loading">Chargement...</h1>;
  if (error) return <h1 className="loading">{error}</h1>;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h1>Classement Général</h1>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <span>Position</span>
            <span>Pseudo</span>
            <span>Score</span>
          </div>
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <div key={user._id || index} className="leaderboard-row">
                <span>{index + 1}</span>
                <span>{user.pseudo}</span>
                <span>{user.bestScore}</span>
              </div>
            ))
          ) : (
            <p>Aucun joueur dans le classement</p>
          )}
        </div>
        <br />
        <Link to="/">
          <button>Retour à l'accueil</button>
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
