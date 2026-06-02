export const QuizCard = ({ question, onAnswer }) => {
  return (
    <div className="quiz-card">
      <div className="category">{question.category}</div>
      <h2>{question.text || question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
