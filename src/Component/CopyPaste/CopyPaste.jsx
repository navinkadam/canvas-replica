import React, { PureComponent } from "react";

export default class CopyPaste extends PureComponent {
  state = {
    cloneObject: null
  };
  onCopy = e => {
    if (
      this.props.canvas.getActiveObject() === undefined ||
      this.props.canvas.getActiveObject() === null
    ) {
      return "";
    }
    this.props.canvas.getActiveObject().clone(cloned => {
      this.setState({ cloneObject: cloned });
    });
  };

  onPaste = e => {
    let _cloneObject = this.state.cloneObject;
    if (!_cloneObject) {
      return "";
    }
    _cloneObject.clone(clonedObj => {
      this.props.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = this.props.canvas;
        clonedObj.forEachObject(function(obj) {
          this.props.canvas.add(obj);
        });
        clonedObj.setCoords();
        alert("activeSelection");
      } else {
        this.props.canvas.add(clonedObj);
      }
      _cloneObject.top += 10;
      _cloneObject.left += 10;
      this.props.canvas.setActiveObject(clonedObj);
      this.props.canvas.requestRenderAll();
    });
  };

  componentDidMount() {
    document.addEventListener("keydown", key => {
      if (this.props.canvas.getActiveObject()) {
        if ((key.ctrlKey || key.keyCode === 17) && key.keyCode === 86)
          // 17 ctrl 86 V
          //selected Object Paste
          this.onPaste();
        if ((key.ctrlKey || key.keyCode === 17) && key.keyCode === 67)
          // 17 ctrl 86 C
          //selected Object Copy
          this.onCopy();
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keypress");
  }

  render() {
    return (
      <>
        <div>
          <button onClick={this.onCopy}>Copy</button>
        </div>
        <div>
          <button onClick={this.onPaste}>Paste</button>
        </div>
      </>
    );
  }
}
