import React, { memo } from "react";

export default memo(function Group(props) {
  let onGroup = e => {
    if (
      !props.canvas.getActiveObject() ||
      props.canvas.getActiveObject().type !== "activeSelection"
    ) {
      return "";
    }
    props.canvas.getActiveObject().toGroup();
    props.canvas.renderAll();
  };

  return (
    <div>
      <button onClick={onGroup}>Group</button>
    </div>
  );
});
