import React, { memo } from "react";

export default memo(function Images(props) {
  let { imagesList } = props;
  let onDragStart = event => {
    event.dataTransfer.setData("imageSrc", event.target.src);
  };
  return imagesList.map((src, ind) => (
    <div className="content" src={src} key={ind}>
      <img
        draggable
        src={`/assets/image/${src}`}
        alt={`alt ${src}`}
        onDragStart={onDragStart}
      />
    </div>
  ));
});
