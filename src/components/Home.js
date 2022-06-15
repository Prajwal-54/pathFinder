import React, { useEffect, useState } from "react";

import "../css/home.css";
import Node from "./Node";
import DNode from "./DNode";

import { bfs, getNodesInShortestPathOrder } from "../algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDfs } from "../algorithms/dfs";
import { maze, randWalls } from "../algorithms/maze";

// const G_START_NODE_ROW = 9;
// const G_START_NODE_COL = 8;
// const G_FINISH_NODE_ROW = 10;
// const G_FINISH_NODE_COL = 45;
const NO_OF_ROW = 18;
const NO_OF_COL = 60;

const SPEEDS = [11, 5, 17];

export default function Home() {
  //    states   //
  const [graph, setGraph] = useState([]);
  const [mousePressed, setmousePressed] = useState(false);
  const [mousePressed2, setmousePressed2] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [cordinates, setCordinates] = useState({
    START_NODE_ROW: 10,
    START_NODE_COL: 16,
    FINISH_NODE_ROW: 10,
    FINISH_NODE_COL: 45,
  });
  const [curAlgo, setCurAlgo] = useState("Select an Algorithm");
  const [curSpeed, setCurSpeed] = useState(0);

  // var count = 0;

  useEffect(() => {
    // alert("hi");
    // const cur = graph
    if (startSelected !== true || endSelected !== true) {
      const g = createGraph(cordinates, graph);
      setGraph(g);
    }
  }, [cordinates]);

  //    animations   //
  function animateShortestPath(shortestpath, reached, speed) {
    if (!reached) return;
    shortestpath.pop();
    shortestpath.shift();
    for (let i = 0; i < shortestpath.length; i++) {
      setTimeout(() => {
        const node = shortestpath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, speed * i);
    }
  }
  function visualize(visitedNodesInOrder, shortestpath, reached) {
    var speed = SPEEDS[curSpeed];

    // visitedNodesInOrder.pop();
    visitedNodesInOrder.shift();
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestpath, reached, speed);
        }, speed * i);
        return;
      }
      if (
        visitedNodesInOrder[i].row === cordinates.FINISH_NODE_ROW &&
        visitedNodesInOrder[i].col === cordinates.FINISH_NODE_COL
      )
        continue;
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, speed * i);
    }
  }

  //    alogorithms   //
  function startBfs() {
    setmousePressed(false);
    setmousePressed2(false);
    // const g = graph;
    // const c = cordinates;
    const start = graph[cordinates.START_NODE_ROW][cordinates.START_NODE_COL];
    const end = graph[cordinates.FINISH_NODE_ROW][cordinates.FINISH_NODE_COL];
    // console.log(cordinates);
    const shortestpathInOrder = bfs(graph, start, end);
    const startToEnd = getNodesInShortestPathOrder(end);
    visualize(
      shortestpathInOrder.path,
      startToEnd,
      shortestpathInOrder.reached
    );
  }

  function startDfs() {
    // const g = graph;
    const start = graph[cordinates.START_NODE_ROW][cordinates.START_NODE_COL];
    const end = graph[cordinates.FINISH_NODE_ROW][cordinates.FINISH_NODE_COL];
    const shortestpathInOrder = dfs(graph, start, end, false);
    const startToEnd = getNodesInShortestPathOrderDfs(end);
    // console.log(shortestpathInOrder.path, shortestpathInOrder.reached);
    visualize(
      shortestpathInOrder.path,
      startToEnd,
      shortestpathInOrder.reached
    );
  }
  function startAlgo() {
    if (curAlgo === "BFS") startBfs();
    else if (curAlgo === "DFS") startDfs();
    else setCurAlgo("Select an Algorithm");
  }

  //    clear functions   //
  function clearGraph() {
    // setmousePressed(false);
    const div = document.getElementsByClassName("node node-visited");
    const div1 = document.getElementsByClassName("node node-shortest-path");
    const walls = document.getElementsByClassName("node node-wall");

    while (div.length) {
      div[0].classList.remove("node-visited");
    }
    while (div1.length) {
      div1[0].classList.remove("node-shortest-path");
    }

    while (walls.length) {
      walls[0].classList.remove("node-wall");
    }
    document.getElementById(
      `node-${cordinates.START_NODE_ROW}-${cordinates.START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(
      `node-${cordinates.FINISH_NODE_ROW}-${cordinates.FINISH_NODE_COL}`
    ).className = "node node-finish";
    // const c = c;
    const g = createGraph(cordinates, []);
    setGraph(g);
  }
  function clearPaths() {
    const visitedDiv = document.getElementsByClassName("node node-visited");
    const shortestDiv = document.getElementsByClassName(
      "node node-shortest-path"
    );
    while (visitedDiv.length) {
      visitedDiv[0].classList.remove("node-visited");
    }
    while (shortestDiv.length) {
      shortestDiv[0].classList.remove("node-shortest-path");
    }
    document.getElementById(
      `node-${cordinates.START_NODE_ROW}-${cordinates.START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(
      `node-${cordinates.FINISH_NODE_ROW}-${cordinates.FINISH_NODE_COL}`
    ).className = "node node-finish";

    const g = createGraph(cordinates, graph);
    setGraph(g);
  }

  //    walls/maze   //
  function setWallBtn() {
    setmousePressed((v) => {
      return !v;
    });
    setmousePressed2(false);
    setStartSelected(false);
    setEndSelected(false);
  }

  function toggleWall(g, row, col) {
    const gg = g.slice();
    const node = gg[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    gg[row][col] = newNode;
    return gg;
  }
  function randomWalls() {
    // console.log("rnad");
    clearPaths();
    const empty = emptyGraph(cordinates);
    const newG = randWalls(empty, cordinates);
    const g = createGraph(cordinates, newG);
    setGraph(g);
  }
  function createMaze() {
    clearPaths();
    const e1 = emptyGraph(cordinates);
    const e2 = emptyGraph(cordinates);
    const e3 = emptyGraph(cordinates);
    const e4 = emptyGraph(cordinates);
    const { allPaths, newCordinate } = maze(e1, e2, e3, e4);
    var newGraph = emptyGraph(newCordinate);
    // console.log(allPaths[0][0]);
    for (let row = 0; row < NO_OF_ROW; row++) {
      for (let col = 0; col < NO_OF_COL; col++) {
        newGraph = toggleWall(newGraph, row, col);
      }
    }
    allPaths.forEach((path) => {
      path.forEach((node) => {
        if (
          newGraph[node.row][node.col].isWall &&
          node.row !== 0 &&
          node.row !== 17 &&
          node.col !== 0 &&
          node.col !== 59
        )
          newGraph = toggleWall(newGraph, node.row, node.col);
      });
    });
    // console.log(newCordinate);

    setCordinates(newCordinate);
    const g = createGraph(newCordinate, newGraph);
    setGraph(g);
  }

  //    mouse functions  //
  const drageStart = (e, position) => {
    if (position.isStart) {
      setEndSelected(false);
      setStartSelected(true);
    } else if (position.isFinish) {
      setStartSelected(false);
      setEndSelected(true);
    } else e.preventDefault();
    // setmousePressed(false);
    // setmousePressed2(false);
    // console.log("start", cordinates);
  };

  const drageEnter = (e, position) => {
    // console.log(position);
    // if (mousePressed === true) return;
    const r = parseInt(position.row);
    const c = parseInt(position.col);
    const ss = startSelected;
    const ee = endSelected;

    if (graph[r][c].isWall) return;
    // console.log("enter", cordinates);
    if (ss) {
      if (r === cordinates.FINISH_NODE_ROW && c === cordinates.FINISH_NODE_COL)
        return;

      setCordinates((cc) => {
        return {
          START_NODE_ROW: r,
          START_NODE_COL: c,
          FINISH_NODE_ROW: cc.FINISH_NODE_ROW,
          FINISH_NODE_COL: cc.FINISH_NODE_COL,
        };
      });
    }
    if (ee) {
      if (r === cordinates.START_NODE_ROW && c === cordinates.START_NODE_COL)
        return;
      setCordinates((cc) => {
        return {
          FINISH_NODE_ROW: r,
          FINISH_NODE_COL: c,
          START_NODE_ROW: cc.START_NODE_ROW,
          START_NODE_COL: cc.START_NODE_COL,
        };
      });
    }
  };

  const drageEnd = (e, position) => {
    // if (mousePressed === true) return;

    const r = parseInt(position.row);
    const c = parseInt(position.col);
    const ss = startSelected;
    const ee = endSelected;

    // const cord = cordinates;
    if (graph[r][c].isWall) return;

    if (ss) {
      if (r === cordinates.FINISH_NODE_ROW && c === cordinates.FINISH_NODE_COL)
        return;
      document.getElementById(
        `node-${cordinates.START_NODE_ROW}-${cordinates.START_NODE_COL}`
      ).className = "node";
      document.getElementById(`node-${r}-${c}`).className = "node node-start";
      setCordinates((cc) => {
        return {
          START_NODE_ROW: r,
          START_NODE_COL: c,
          FINISH_NODE_ROW: cc.FINISH_NODE_ROW,
          FINISH_NODE_COL: cc.FINISH_NODE_COL,
        };
      });
    }
    if (ee) {
      if (r === cordinates.START_NODE_ROW && c === cordinates.START_NODE_COL)
        return;
      document.getElementById(
        `node-${cordinates.FINISH_NODE_ROW}-${cordinates.FINISH_NODE_COL}`
      ).className = "node";
      document.getElementById(`node-${r}-${c}`).className = "node node-finish";
      setCordinates((cc) => {
        return {
          FINISH_NODE_ROW: r,
          FINISH_NODE_COL: c,
          START_NODE_ROW: cc.START_NODE_ROW,
          START_NODE_COL: cc.START_NODE_COL,
        };
      });
    }

    setStartSelected(false);
    setEndSelected(false);
    setmousePressed(false);
    setmousePressed2(false);

    // console.log("end", cordinates);
  };

  function checkStartOrEnd(row, col) {
    const c = cordinates;
    if (
      (row === c.START_NODE_ROW && col === c.START_NODE_COL) ||
      (row === c.FINISH_NODE_ROW && col === c.FINISH_NODE_COL)
    )
      return true;
    else return false;
  }

  function onMouseUp(row, col) {
    // console.log("up");
    setmousePressed2(false);
    // setRouterSelected(false);
    // console.log("mouse up");
  }

  function onMouseDown(row, col, e) {
    const mouse = mousePressed;

    if (mouse === false && checkStartOrEnd(row, col) === true) {
      return;
    }
    if (row === cordinates.START_NODE_ROW && col === cordinates.START_NODE_COL)
      return;
    if (
      row === cordinates.FINISH_NODE_ROW &&
      col === cordinates.FINISH_NODE_COL
    )
      return;
    // console.log("down");

    const curNode = document.getElementById(`node-${row}-${col}`);
    const r = document.getElementById(`wall-${row}-${col}`);

    const g = graph;
    if (mouse === false) return;
    setmousePressed2(true);

    const newGraph = toggleWall(g, row, col);
    setGraph(newGraph);
  }

  function onMouseEnter(row, col) {
    if (row === cordinates.START_NODE_ROW && col === cordinates.START_NODE_COL)
      return;
    if (
      row === cordinates.FINISH_NODE_ROW &&
      col === cordinates.FINISH_NODE_COL
    )
      return;
    const pressAndHold2 = mousePressed2;
    const pressAndHold = mousePressed;

    if (checkStartOrEnd(row, col) === true && pressAndHold === false) {
      return;
    } else {
      if (pressAndHold === false || pressAndHold2 === false) return;
      const curNode = document.getElementById(`node-${row}-${col}`);
      const r = document.getElementById(`wall-${row}-${col}`);

      // console.log("mouse enter");

      const g = graph;
      const newGraph = toggleWall(g, row, col);
      setGraph(newGraph);
    }
  }

  return (
    <div className="main">
      <div className="header">
        <h2>Pathfinding Visualizer</h2>
        <div className="buttonWrap">
          <select
            className="algoList"
            value={curAlgo}
            onChange={(e) => setCurAlgo(e.target.value)}
          >
            <option>Algorithm</option>
            <option>BFS</option>
            <option>DFS</option>
          </select>

          <button onClick={() => randomWalls()}>Random Walls</button>
          <button onClick={() => createMaze()}>Maze</button>
          <button onClick={() => startAlgo()}>Start</button>
          <button onClick={() => setWallBtn()}>
            Place Wall : {mousePressed ? "on" : "off"}
          </button>
          <button onClick={() => clearPaths()}>Clear Paths</button>
          <button onClick={() => clearGraph()}>Clear Graph</button>
          <select
            className="speedList"
            value={
              curSpeed === 0
                ? "normal"
                : curSpeed === 1
                ? "fast"
                : curSpeed === 2
                ? "slow"
                : "normal"
            }
            onChange={(e) =>
              setCurSpeed((c) => {
                return e.target.value === "normal"
                  ? 0
                  : e.target.value === "fast"
                  ? 1
                  : e.target.value === "slow"
                  ? 2
                  : 0;
              })
            }
          >
            <option>normal</option>
            <option>slow</option>
            <option>fast</option>
          </select>
        </div>
        <div className="legends">
          <DNode
            isFinish={false}
            isStart={true}
            isWall={false}
            isVisited={false}
            isShortest={false}
            isUnvisited={false}
          ></DNode>
          <DNode
            isFinish={true}
            isStart={false}
            isWall={false}
            isVisited={false}
            isShortest={false}
            isUnvisited={false}
          ></DNode>
          <DNode
            isFinish={false}
            isStart={false}
            isWall={true}
            isVisited={false}
            isShortest={false}
            isUnvisited={false}
          ></DNode>
          <DNode
            isFinish={false}
            isStart={false}
            isWall={false}
            isVisited={false}
            isShortest={false}
            isUnvisited={true}
          ></DNode>
          <DNode
            isFinish={false}
            isStart={false}
            isWall={false}
            isVisited={true}
            isShortest={false}
            isUnvisited={false}
          ></DNode>
          <DNode
            isFinish={false}
            isStart={false}
            isWall={false}
            isVisited={false}
            isShortest={true}
            isUnvisited={false}
          ></DNode>
        </div>
        <div className="board">pick an algorithm and start !</div>
      </div>
      <div
        id="g"
        className="graph"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => e.preventDefault()}
        draggable
      >
        {graph.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, distance, isWall } = node;

                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    distance={distance}
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                    drageStart={drageStart}
                    drageEnter={drageEnter}
                    drageEnd={drageEnd}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function createNode(col, row, c) {
  return {
    col,
    row,
    isStart: row === c.START_NODE_ROW && col === c.START_NODE_COL,
    isFinish: row === c.FINISH_NODE_ROW && col === c.FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

function emptyGraph(c) {
  const graph = [];

  for (let row = 0; row < NO_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_OF_COL; col++) {
      currentRow.push(createNode(col, row, c));
    }
    graph.push(currentRow);
  }

  // console.log(graph);
  return graph;
}

function createGraph(c, g) {
  // console.log("create", c);

  const graph = [];

  for (let row = 0; row < NO_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_OF_COL; col++) {
      var cur;
      if (g.length !== 0 && g[row][col].isWall) {
        cur = g[row][col];
      } else cur = createNode(col, row, c);
      currentRow.push(cur);
    }
    graph.push(currentRow);
  }

  // console.log(graph);
  return graph;
}
