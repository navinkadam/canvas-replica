import React, { Component } from "react";
import { fabric } from "fabric";
export default class Shapes extends Component {
  drawCircle = e => {
    let c = new fabric.Circle({
      top: 20,
      left: 20,
      radius: 100,
      fill: "",
      stroke: "#fff",
      strokeWidth: "2",
      width: 20,
      height: 20
    });
    this.props.canvas.add(c);
    this.props.canvas.renderAll();
  };

  drawRect = e => {
    let rect = new fabric.Rect({
      top: 30,
      left: 30,
      width: 300,
      height: 300,
      fill: "",
      stroke: "#fff",
      strokeWidth: 2
    });
    this.props.canvas.add(rect);
    this.props.canvas.renderAll();
  };

  drawTriangle = e => {
    var tri = new fabric.Triangle({
      top: 40,
      left: 40,
      width: 200,
      height: 100,
      fill: "",
      stroke: "#fff",
      strokeWidth: 2
    });
    this.props.canvas.add(tri);
    this.props.canvas.renderAll();
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.drawCircle}>Circle</button>
        </div>
        <div>
          <button onClick={this.drawRect}>Rectangle</button>
        </div>
        <div>
          <button onClick={this.drawTriangle}>Triangle</button>
        </div>
      </div>
    );
  }
}
