import { useState, useEffect, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Timer } from "../components/Timer";
import { QuizCard } from "../components/QuizCard";
import { useUser } from "../context/UserContext";

const initialState = {
  currentQuestion: 0,
  score: 0,
  finished: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "ANSWER_QUESTION": {
      const isCorrect = action.payload.selected === action.payload.correct;
      const nextQuestion = state.currentQuestion + 1;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: nextQuestion,
        finished: nextQuestion >= action.payload.total,
      };
    }
    case "FINISH_QUIZ":
      return {
        ...state,
        finished: true,
      };
    default:
      return state;
  }
};

const QuizEngine = () => {
  const { data, loading, error } = useFetch("/questions.json");
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const {
    setFinalScore,
    setBestScore,
    bestScore,
    setTotalQuestions,
  } = useUser();

  useEffect(() => {
    setTimeLeft(60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          dispatch({ type: "FINISH_QUIZ" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state.currentQuestion]);

  useEffect(() => {
    if (state.finished && data.length > 0) {
      clearInterval(timerRef.current);
      setFinalScore(state.score);
      setTotalQuestions(data.length);
      if (state.score > bestScore) {
        setBestScore(state.score);
      }
      navigate("/resultats");
    }
  }, [
    state.finished,
    state.score,
    data.length,
    navigate,
    setFinalScore,
    setBestScore,
    bestScore,
    setTotalQuestions,
  ]);

  const handleAnswer = (selectedOption) => {
    const question = data[state.currentQuestion];
    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        selected: selectedOption,
        correct: question.bonne_reponse,
        total: data.length,
      },
    });
  };

  if (loading) return <h1 className="loading">Chargement...</h1>;
  if (error) return <h1 className="loading">{error}</h1>;
  if (data.length === 0) return <h1 className="loading">Aucune question trouvée</h1>;

  const question = data[state.currentQuestion];

  return (
    <div className="quiz-page">
      <div className="notebook-bg">
        <Timer timeLeft={timeLeft} />
        {!state.finished && question && (
          <>
            <QuizCard question={question} onAnswer={handleAnswer} />
            <button
              className="next-btn"
              onClick={() => handleAnswer("Aucune réponse")}
            >
              Question suivante
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
