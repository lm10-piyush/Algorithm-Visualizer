import React, { Component } from "react";
import { Node } from "./Node";
import "./Dijkstra.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const START_ROW = 10;
const FINISH_ROW = 10;
const START_COL = 7;
const FINISH_COL = 38;

export class Dijkstra extends Component {
  constructor(props) {
    super(props);
    this.state = { grid: [], mouseIsPressed: false };
  }
  componentDidMount() {
    const grid = initializeGrid();
    this.setState({ grid });
  }
  handleReset() {
    const grid = initializeGrid();
    this.setState({ grid });
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 47; ++j) {
        if (i == START_ROW && j == START_COL) {
          document.getElementById(`node-${i}-${j}`).className =
            "node node-start";
        } else if (i == FINISH_ROW && j == FINISH_COL) {
          document.getElementById(`node-${i}-${j}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log("animate");
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    const compNodes = grid.map((row, rowIdx) => {
      return (
        <div key={rowIdx} className="rowElements">
          {row.map((node, nodeIdx) => {
            const { row, col, start, finish, isWall } = node;
            return (
              <Node
                key={nodeIdx}
                row={row}
                col={col}
                start={start}
                finish={finish}
                isWall={isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                onMouseUp={() => this.handleMouseUp()}
              />
            );
          })}
        </div>
      );
    });

    return (
      <div className="main">
        <button onClick={() => this.visualizeDijkstra()} className="run">
          Run
        </button>
        <button onClick={() => this.handleReset()} className="reset">
          Reset
        </button>
        <h3 className="topic">Dijkstra Algorithm</h3>
        <div className="grid">{compNodes}</div>
      </div>
    );
  }
}

const initializeGrid = () => {
  const grid = [];
  for (let i = 0; i < 19; i++) {
    const rowElement = [];
    for (let j = 0; j < 47; ++j) {
      rowElement.push(createNode(i, j));
    }
    grid.push(rowElement);
  }
  return grid;
};

const createNode = (row, col) => {
  const node = {
    row: row,
    col: col,
    start: row === START_ROW && col === START_COL,
    finish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
  return node;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Dijkstra;
