import React, { memo } from "react";

export default memo(function Download(props) {
  let onDownloadImage = e => {
    let a = document.createElement("a");
    a.href = props.canvas.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 1.0
    });
    a.download = "custom.png";
    a.click();
  };

  return (
    <div>
      <button onClick={onDownloadImage}>download Image</button>
    </div>
  );
});
