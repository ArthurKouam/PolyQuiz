import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [pseudo, setPseudo] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
