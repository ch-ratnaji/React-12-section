import { useEffect, useState } from "react";

export default function QuizTimer({ onTimeOut, timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeOut, timeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
