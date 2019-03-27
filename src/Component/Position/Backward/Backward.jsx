import React, { memo } from "react";

export default memo(function Backward(props) {
  let selectedObjectBackward = e => {
    if (!props.canvas.getActiveObject()) return "";
    props.canvas.sendToBack(props.canvas.getActiveObject());
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={selectedObjectBackward}>Backward</button>
    </div>
  );
});
