import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home = () => {
  const [inputPseudo, setInputPseudo] = useState("");
  const { setPseudo } = useUser();
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (inputPseudo.trim()) {
      setPseudo(inputPseudo.trim());
      navigate("/quiz");
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
          />
          <button type="submit">Commencer le quiz</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
