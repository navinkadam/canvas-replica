import React, { memo } from "react";
import { fabric } from "fabric";

export default memo(function DrawText(props) {
  let drawText = () => {
    let text = new fabric.Textbox("type text", {
      left: 50,
      top: 20,
      width: 80,
      height: 200,
      fontFamily: "helvetica neue",
      fill: "black",
      stroke: "#fff",
      fontSize: (30 * 72) / 96,
      strokeWidth: 0
    });

    text.setControlsVisibility({
      mt: false,
      mb: false
    });
    props.canvas.add(text);
    props.canvas.setActiveObject(text);
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={drawText}>Add Text</button>
    </div>
  );
});
