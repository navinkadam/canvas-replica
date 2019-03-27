import React, { Component } from 'react';

export default class ReactCanvas extends Component {
  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          height="500%"
          width="700%"
          className="canvas"
        />
      </div>
    );
  }
}
