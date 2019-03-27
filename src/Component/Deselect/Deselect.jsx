import React, { Component } from 'react';

export default class Deselect extends Component {
  render() {
    return (
      <div>
        <button
          onClick={e =>
            this.canvas.discardActiveObject() && this.canvas.requestRenderAll()
          }>
          Deselect
        </button>
      </div>
    );
  }
}
