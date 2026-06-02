import { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEYS } from "../config/apiConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [pseudo, setPseudo] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const storedPseudo = localStorage.getItem(STORAGE_KEYS.PSEUDO);
    if (storedPseudo) {
      setPseudo(storedPseudo);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.PSEUDO);
    setPseudo("");
    setBestScore(0);
  };

  return (
    <UserContext.Provider
      value={{
        pseudo,
        setPseudo,
        finalScore,
        setFinalScore,
        bestScore,
        setBestScore,
        totalQuestions,
        setTotalQuestions,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
