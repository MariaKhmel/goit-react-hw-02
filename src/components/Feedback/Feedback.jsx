import css from "./Feedback.module.css";
console.log(css);

function Feedback({ options, total, positiveFeedbackRate }) {
  const entries = Object.entries(options);

  return (
    <>
      <ul>
        {entries.map(([key, value]) => (
          <li key={key}>
            {key} : {value}
          </li>
        ))}
        <li>Total : {total}</li>
        <li>Postive : {positiveFeedbackRate}</li>
      </ul>
    </>
  );
}

export default Feedback;
