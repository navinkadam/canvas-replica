import React, { memo } from "react";

export default memo(function FontFamily(props) {
  let { selectedFontFamily, onChangeFontFamily, fonts } = props;
  if (!(onChangeFontFamily && fonts)) {
    alert("fill all details--> onChangeFontFamily && fonts");

    return <div>fill all details--> onChangeFontFamily && fonts</div>;
  }
  return (
    <div>
      <label htmlFor="fontFamily">Font Family : </label>
      <select
        id="fontFamily"
        name="font-family"
        value={selectedFontFamily}
        onChange={onChangeFontFamily}
      >
        {fonts.map((fontName, ind) => (
          <option key={`${ind}`} value={`${fontName}`}>{`${fontName}`}</option>
        ))}
      </select>
    </div>
  );
});
