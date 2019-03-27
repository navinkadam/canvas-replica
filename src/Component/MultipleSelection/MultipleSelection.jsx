import React, { memo } from "react";
import { fabric } from "fabric";

export default memo(function MultipleSelection(props) {
  let onMultipleSelection = e => {
    props.canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(props.canvas.getObjects(), {
      canvas: props.canvas
    });
    props.canvas.setActiveObject(sel);
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={onMultipleSelection}>Multiple Selection</button>
    </div>
  );
});
