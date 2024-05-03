import { useCallback, useState } from "react";
import QuizTimer from "./QuizTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAns) => {
        return [...prevUserAns, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="quizCompletedImage" />
        <h2>QuizCompleted!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuizTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAns={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
