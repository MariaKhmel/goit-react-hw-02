import { useEffect, useState } from "react";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";
import Description from "../Description/Description";

const LS_KEY = "options";

function App() {
  const [options, setOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = options;
  const totalFeedback = good + neutral + bad;
  const isResetBtnShown = totalFeedback > 0;
  const positiveFeedbackRate = Math.round(
    ((good + neutral) / totalFeedback) * 100
  );

  useEffect(() => {
    const optionsFromLocalstorage = localStorage.getItem(LS_KEY);
    const parsedoptionsFromLocalstorage = JSON.parse(optionsFromLocalstorage);
    if (parsedoptionsFromLocalstorage) {
      setOptions(parsedoptionsFromLocalstorage);
    }
  }, []);

  useEffect(() => {
    const savedOptions = JSON.stringify(options);
    localStorage.setItem(LS_KEY, savedOptions);
  }, [options]);

  const updateFeedback = (feedbackType) => {
    setOptions({
      ...options,
      [feedbackType]: options[feedbackType] + 1,
    });
  };

  const isResetBtnClicked = (clicked) => {
    if (clicked) {
      setOptions({ good: 0, neutral: 0, bad: 0 });
    }
  };

  return (
    <>
      <Description />
      <Options
        options={options}
        updateFeedback={updateFeedback}
        isResetBtnShown={isResetBtnShown}
        isResetBtnClicked={isResetBtnClicked}
      />
      {totalFeedback > 0 && (
        <Feedback
          options={options}
          total={totalFeedback}
          positiveFeedbackRate={positiveFeedbackRate}
        />
      )}
      {totalFeedback === 0 && <Notification />}
    </>
  );
}

export default App;
