import { Component } from "react";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Notification from "../Notification/Notification";
import Description from "../Description/Description";

const LS_KEY = "options";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  componentDidMount() {
    const optionsFromLocalstorage = localStorage.getItem(LS_KEY);
    const parsedoptionsFromLocalstorage = JSON.parse(optionsFromLocalstorage);
    if (parsedoptionsFromLocalstorage) {
      this.setState(parsedoptionsFromLocalstorage);
    }
  }

  componentDidUpdate() {
    const savedOptions = JSON.stringify(this.state);
    localStorage.setItem(LS_KEY, savedOptions);
  }

  updateFeedback = (feedbackType) => {
    this.setState((prevState) => ({
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  isResetBtnClicked = (clicked) => {
    if (clicked) {
      this.setState({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    }
  };

  render() {
    const { good, bad, neutral } = this.state;
    const totalFeedback = good + neutral + bad;
    const isResetBtnShown = totalFeedback > 0;
    const positiveFeedbackRate = Math.round(
      ((good + neutral) / totalFeedback) * 100
    );

    return (
      <>
        <Description />
        <Options
          options={this.state}
          updateFeedback={this.updateFeedback}
          isResetBtnShown={isResetBtnShown}
          isResetBtnClicked={this.isResetBtnClicked}
        />
        {totalFeedback > 0 && (
          <Feedback
            options={this.state}
            total={totalFeedback}
            positiveFeedbackRate={positiveFeedbackRate}
          />
        )}
        {totalFeedback === 0 && <Notification />}
      </>
    );
  }
}

export default App;
