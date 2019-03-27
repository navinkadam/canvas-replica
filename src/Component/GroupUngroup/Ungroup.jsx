import React, { memo } from "react";

export default memo(function Ungroup(props) {
  let onUnGroup = e => {
    if (!props.canvas.getActiveObject()) {
      return;
    }
    if (props.canvas.getActiveObject().type !== "group") {
      return;
    }
    props.canvas.getActiveObject().toActiveSelection();
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={onUnGroup}>UnGroup</button>
    </div>
  );
});
