import React, { memo } from "react";

export default memo(function ButtonReact(props) {
  let onClick = e => {
    if (e.target.id === "bold") onClickBold(e);
    else if (e.target.id === "underLine") onClickUnderLine(e);
    else if (e.target.id === "italic") onClickItalic(e);
  };

  let onClickBold = e => {
    if (props.canvas.getActiveObject().fontWeight === "normal") {
      props.canvas.getActiveObject().set("fontWeight", "bold");
      props.canvas.renderAll();
    } else if (props.canvas.getActiveObject().fontWeight === "bold") {
      props.canvas.getActiveObject().set("fontWeight", "normal");
      props.canvas.renderAll();
    }
  };
  let onClickUnderLine = e => {
    if (!props.canvas.getActiveObject().underline) {
      props.canvas.getActiveObject().set("underline", true);
      props.canvas.renderAll();
    } else {
      props.canvas.getActiveObject().set("underline", false);
      props.canvas.renderAll();
    }
  };

  let onClickItalic = e => {
    if (props.canvas.getActiveObject().fontStyle === "normal") {
      props.canvas.getActiveObject().set("fontStyle", "italic");
      props.canvas.renderAll();
    } else {
      props.canvas.getActiveObject().set("fontStyle", "normal");
      props.canvas.renderAll();
    }
  };

  return (
    <div>
      <button id={props.id} onClick={onClick}>
        {props.displayText}
      </button>
    </div>
  );
});
