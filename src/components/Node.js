import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      col,
      start,
      finish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const extraClass = finish
      ? "node-finish"
      : start
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        className={`node ${extraClass}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
