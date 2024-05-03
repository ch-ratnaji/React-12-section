import { useRef } from "react";
export default function Answers({
  answers,
  selectedAns,
  answerState,
  onSelect,
}) {
  const shuffledAns = useRef();
  if (!shuffledAns.current) {
    shuffledAns.current = [...answers.sort(() => Math.random() - 0.5)];
  }

  return (
    <ul id="answers">
      {shuffledAns.current.map((ans) => {
        const isSelected = selectedAns === ans;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={ans} className="answer">
            <button onClick={() => onSelect(ans)} className={cssClass}>
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
