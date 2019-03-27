import React, { Component } from 'react';

export default class Paste extends Component {
  onPaste = e => {
    let _cloneObject = this.state.cloneObject;
    if (
      _cloneObject === '' ||
      _cloneObject === null ||
      _cloneObject === undefined
    ) {
      return '';
    }
    _cloneObject.clone(clonedObj => {
      this.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });
      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = this.canvas;
        clonedObj.forEachObject(function(obj) {
          this.canvas.add(obj);
        });
        clonedObj.setCoords();
        alert('activeSelection');
      } else {
        this.canvas.add(clonedObj);
      }
      _cloneObject.top += 10;
      _cloneObject.left += 10;
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
    });
    this.customsControl();
  };
  render() {
    return (
      <div>
        <button onClick={this.onPaste}>Paste</button>
      </div>
    );
  }
}
