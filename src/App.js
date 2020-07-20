import React, { Component } from "react";
import { Dijkstra } from "./components/Dijkstra";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Algorithm Visualizer</h1>
        <Dijkstra />
      </div>
    );
  }
}

export default App;
