import React, { Component } from "react";

export default class RangeBarReact extends Component {
  state = { value: this.props.value };
  onChange = e => {
    if (e.target.id === "letterSpacing") {
      this.onChangeLetterSpacing(e);
    } else if (e.target.id === "lineHeight") {
      this.onChangeLineHeight(e);
    } else if (e.target.id === "transparent") {
      this.onChangeTransparent(e);
    }
  };

  onChangeLetterSpacing = e => {
    if (this.props.canvas.getActiveObject()) {
      this.setState({ value: e.target.value });
      this.props.canvas.getActiveObject().set("charSpacing", e.target.value);

      this.props.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeLineHeight = e => {
    if (this.props.canvas.getActiveObject()) {
      this.setState({ value: e.target.value });
      this.props.canvas.getActiveObject().set("lineHeight", e.target.value);
      this.props.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeTransparent = e => {
    if (this.props.canvas.getActiveObject()) {
      this.setState({ value: e.target.value });
      this.props.canvas
        .getActiveObject()
        .set("opacity", String(e.target.value * 0.01).substr(0, 4));
      this.props.canvas.renderAll();
    } else {
      return alert("select object");
    }
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor={this.props.id}>{this.props.displayText} : </label>
          <input
            id={this.props.id}
            type="range"
            value={this.state.value}
            onChange={this.onChange}
            min={this.props.rangeMin}
            max={this.props.rangeMax}
            step={this.props.rangeStep}
          />
        </div>
      </div>
    );
  }
}
