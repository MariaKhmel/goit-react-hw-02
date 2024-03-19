import css from "./Options.module.css";
function Options({
  options,
  updateFeedback,
  isResetBtnShown,
  isResetBtnClicked,
}) {
  const optionsArray = Object.keys(options);

  return (
    <div className={css.options}>
      {optionsArray.map((option, idx) => (
        <button key={idx} onClick={() => updateFeedback(option)} type="click">
          {option}
        </button>
      ))}

      {isResetBtnShown && (
        <button type="click" onClick={() => isResetBtnClicked(true)}>
          Reset
        </button>
      )}
    </div>
  );
}

export default Options;
