import React, { memo } from "react";

export default memo(function Input(props) {
  let { id, type, value, onChange, displayText } = props;
  if (!(id && type && onChange && displayText)) {
    alert("fill all details--> id, type, value, onChangeFontSize, displayText");
    return (
      <div>
        fill all details--> id, type, value, onChangeFontSize, displayText
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>{displayText} : </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        // style={{ width: "40px" }}
      />
    </div>
  );
});
