import React, { memo } from "react";

export default memo(function Forward(props) {
  let selectedObjectForward = e => {
    if (!props.canvas.getActiveObject()) return "";
    props.canvas.bringForward(props.canvas.getActiveObject());
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={selectedObjectForward}>forward</button>
    </div>
  );
});
