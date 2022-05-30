import React, { useEffect, useState } from "react";
import "../css/home.css";
import Node from "./Node";
import sound3 from "../sounds/s3.wav";

import { bfs, getNodesInShortestPathOrder } from "../algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDfs } from "../algorithms/dfs";
import { maze, randWalls } from "../algorithms/maze";

// const G_START_NODE_ROW = 9;
// const G_START_NODE_COL = 8;
// const G_FINISH_NODE_ROW = 10;
// const G_FINISH_NODE_COL = 45;
const NO_OF_ROW = 20;
const NO_OF_COL = 60;

export default function Home() {
  //states
  const [graph, setGraph] = useState([]);
  const [mousePressed, setmousePressed] = useState(false);
  const [mousePressed2, setmousePressed2] = useState(false);
  const [routerSelected, setRouterSelected] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);

  const [connect, setConnect] = useState(false);
  const [cordinates, setCordinates] = useState({
    START_NODE_ROW: 10,
    START_NODE_COL: 16,
    FINISH_NODE_ROW: 10,
    FINISH_NODE_COL: 45,
  });

  const [routers, setRouters] = useState([]);
  const [tempBfs, setTempBfs] = useState("");
  // var count = 0;

  useEffect(() => {
    // const cur = graph
    if (startSelected !== true || endSelected !== true) {
      const g = createGraph(cordinates, graph, routers);
      setGraph(g);
    }
  }, [cordinates]);

  function animateShortestPath(shortestpath, reached) {
    if (!reached) return;

    var audio = new Audio(sound3);

    var speed = 60;
    if (shortestpath.length > 15) speed = 50;
    else if (shortestpath.length > 30) speed = 40;
    // console.log(audio);

    for (let i = 0; i < shortestpath.length; i++) {
      setTimeout(() => {
        const node = shortestpath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        audio.play();
      }, speed * i);
    }
    // audio.pause();
  }

  function visualize(visitedNodesInOrder, shortestpath, reached) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestpath, reached);
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

  function StartBfs() {
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
    const shortestpathInOrder = dfs(graph, start, end);
    const startToEnd = getNodesInShortestPathOrderDfs(end);
    // console.log(shortestpathInOrder.path, shortestpathInOrder.reached);
    visualize(
      shortestpathInOrder.path,
      startToEnd,
      shortestpathInOrder.reached
    );
  }

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
    const g = createGraph(cordinates, [], []);
    setRouters([]);
    setGraph(g);
  }

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

  const drageStart = (e, position) => {
    if (position.isStart) {
      setEndSelected(false);
      setStartSelected(true);
      setRouterSelected(false);
    } else if (position.isFinish) {
      setStartSelected(false);
      setEndSelected(true);
      setRouterSelected(false);
    } else e.preventDefault();
    // setmousePressed(false);
    // setmousePressed2(false);
    // console.log("start", cordinates);
  };

  const drageStart2 = (e, position) => {
    if (connect === false) return;
    if (position.isRouter) {
      setTempBfs({
        startRow: position.row,
        startCol: position.col,
        endRow: position.row,
        endCol: position.col,
      });
    }
  };

  const drageEnd2 = (e, position) => {
    if (connect === false) return;
    if (position.isRouter || position.sOrf) {
      console.log(position);
      const start = graph[tempBfs.startRow][tempBfs.startCol];
      const end = graph[position.row][position.col];
      // const path = bfs(graph, start, end);

      // const startToEnd = getNodesInShortestPathOrder(path);
    }
  };

  function connectNodes() {
    setRouterSelected(false);
    setConnect((t) => !t);
  }

  const drageEnter = (e, position) => {
    // console.log(position);
    // if (mousePressed === true) return;
    const r = parseInt(position.row);
    const c = parseInt(position.col);
    const ss = startSelected;
    const ee = endSelected;

    if (connect) {
      setTempBfs((t) => {
        return {
          startRow: t.startRow,
          startCol: t.startCol,
          endRow: r,
          endCol: c,
        };
      });
      return;
    }
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

    if (position.isRouter) {
      if (connect === false) return;

      // console.log(position);
      const start = graph[tempBfs.startRow][tempBfs.startCol];
      const end = graph[tempBfs.endRow][tempBfs.endCol];

      const path = bfs(graph, start, end);

      const startToEnd = getNodesInShortestPathOrder(end);
      animateShortestPath(startToEnd, path.reached);
      console.log(startToEnd);

      return;
    }

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
    setRouterSelected(false);
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
    setmousePressed2(false);
    // setRouterSelected(false);
    console.log("mouse up");
  }

  function toggleRouter(g, row, col) {
    const gg = g.slice();
    const node = gg[row][col];
    const newNode = {
      ...node,
      isRouter: !node.isRouter,
    };
    gg[row][col] = newNode;
    return gg;
  }
  function onMouseDown(row, col) {
    const mouse = mousePressed;
    if (routerSelected) {
      const newGraph = toggleRouter(graph, row, col);
      setGraph(newGraph);
      return;
    }
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
      console.log("mouse enter");
      const g = graph;
      const newGraph = toggleWall(g, row, col);
      setGraph(newGraph);
    }
  }

  function randomWalls() {
    console.log("rnad");
    const empty = emptyGraph(cordinates, routers);
    const newG = randWalls(empty, cordinates);
    const g = createGraph(cordinates, newG, routers);
    setGraph(g);
  }
  function createMaze() {
    // const e = emptyGraph(cordinates);
    // maze(e);
  }
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function check(rtr) {
    const c = cordinates;

    if (c.FINISH_NODE_COL === rtr.c && c.FINISH_NODE_ROW === rtr.r)
      return false;
    if (c.START_NODE_ROW === rtr.r && c.START_NODE_COL === rtr.c) return false;
    const rrts = routers;
    for (let i = 0; i < rrts.length; i++) {
      if (rrts[i].r === rtr.r && rrts[i].c === rtr.c) return false;
    }
    return true;
  }
  function addRouter() {
    setRouterSelected((t) => !t);
  }

  return (
    <>
      <button onClick={() => StartBfs()}>Visualize BfS's </button>
      <button onClick={() => startDfs()}>Visualize DfS's </button>
      <button onClick={() => clearGraph()}>clearGraph</button>
      <button onClick={() => setWallBtn()}>
        place wall : {String(mousePressed)}
      </button>
      <button onClick={() => randomWalls()}>maze</button>
      <button onClick={() => addRouter()}>add router</button>
      <button onClick={() => connectNodes()}>connect</button>

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
                const {
                  row,
                  col,
                  isFinish,
                  isStart,
                  distance,
                  isRouter,
                  isWall,
                } = node;

                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isRouter={isRouter}
                    distance={distance}
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                    drageStart={drageStart}
                    drageStart2={drageStart2}
                    drageEnter={drageEnter}
                    drageEnd={drageEnd}
                    drageEnd2={drageEnd2}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

function createNode(col, row, c, rt) {
  var isRtr = false;
  for (let i = 0; i < rt.length; i++) {
    if (rt[i].r === row && rt[i].c === col) isRtr = true;
  }
  return {
    col,
    row,
    isStart: row === c.START_NODE_ROW && col === c.START_NODE_COL,
    isFinish: row === c.FINISH_NODE_ROW && col === c.FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isRouter: isRtr,
    isWall: false,
    previousNode: null,
  };
}

function emptyGraph(c, rt) {
  const graph = [];

  for (let row = 0; row < NO_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_OF_COL; col++) {
      currentRow.push(createNode(col, row, c, rt));
    }
    graph.push(currentRow);
  }

  // console.log(graph);
  return graph;
}

function createGraph(c, g, rt) {
  // console.log("create", c);

  const graph = [];

  for (let row = 0; row < NO_OF_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NO_OF_COL; col++) {
      var cur;
      if (g.length !== 0 && g[row][col].isWall) {
        cur = g[row][col];
      } else cur = createNode(col, row, c, rt);
      currentRow.push(cur);
    }
    graph.push(currentRow);
  }

  // console.log(graph);
  return graph;
}
