import { dfs, getNodesInShortestPathOrderDfs } from "./dfs";
import { bfs, getNodesInShortestPathOrder } from "./bfs";
const NO_OF_ROW = 18;
const NO_OF_COL = 60;

export function maze(g1, g2, g3, g4) {
  const allPaths = [];
  var S_ROW, S_COL, F_ROW, F_COL, start, end;
  var i = 0;
  const possibleCordinates = [];

  S_ROW = getRndInteger(1, 7);
  S_COL = getRndInteger(1, 18);
  F_ROW = getRndInteger(10, 15);
  F_COL = getRndInteger(40, 58);
  possibleCordinates.push({
    START_NODE_ROW: S_ROW,
    START_NODE_COL: S_COL,
    FINISH_NODE_ROW: F_ROW,
    FINISH_NODE_COL: F_COL,
  });
  start = g1[S_ROW][S_COL];
  end = g1[F_ROW][F_COL];
  var t = dfs(g1, start, end, true);
  var path = getNodesInShortestPathOrderDfs(end);
  if (t.reached) allPaths.push(path);

  S_ROW = getRndInteger(3, 13);
  S_COL = getRndInteger(1, 18);
  F_ROW = getRndInteger(13, 17);
  F_COL = getRndInteger(40, 56);
  possibleCordinates.push({
    START_NODE_ROW: S_ROW,
    START_NODE_COL: S_COL,
    FINISH_NODE_ROW: F_ROW,
    FINISH_NODE_COL: F_COL,
  });
  start = g2[S_ROW][S_COL];
  end = g2[F_ROW][F_COL];

  t = dfs(g2, start, end, true);
  path = getNodesInShortestPathOrderDfs(end);
  if (t.reached) allPaths.push(path);

  i = 0;

  S_ROW = getRndInteger(1 + i * 2, 7 + i * 2);
  S_COL = getRndInteger(1, 18);
  F_ROW = getRndInteger(10 + i * 2, 13 + i * 2);
  F_COL = getRndInteger(40, 58);
  possibleCordinates.push({
    START_NODE_ROW: S_ROW,
    START_NODE_COL: S_COL,
    FINISH_NODE_ROW: F_ROW,
    FINISH_NODE_COL: F_COL,
  });

  start = g3[S_ROW][S_COL];
  end = g3[F_ROW][F_COL];

  t = bfs(g3, start, end);
  path = getNodesInShortestPathOrder(end);
  if (t.reached) allPaths.push(path);
  i++;

  S_ROW = getRndInteger(1 + i * 2, 7 + i * 2);
  S_COL = getRndInteger(1, 18);
  F_ROW = getRndInteger(10 + i * 2, 13 + i * 2);
  F_COL = getRndInteger(40, 58);
  possibleCordinates.push({
    START_NODE_ROW: S_ROW,
    START_NODE_COL: S_COL,
    FINISH_NODE_ROW: F_ROW,
    FINISH_NODE_COL: F_COL,
  });
  start = g4[S_ROW][S_COL];
  end = g4[F_ROW][F_COL];
  t = bfs(g4, start, end);
  path = getNodesInShortestPathOrder(end);
  if (t.reached) allPaths.push(path);

  // console.log(allPaths);
  const newCordinate =
    possibleCordinates[getRndInteger(0, possibleCordinates.length - 1)];
  return { allPaths, newCordinate };
}

///random walls

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkStartOrEnd(r, col, c) {
  if (
    (r === c.START_NODE_ROW && col === c.START_NODE_COL) ||
    (r === c.FINISH_NODE_ROW && col === c.FINISH_NODE_COL)
  )
    return true;
  else return false;
}
export function randWalls(gg, c) {
  const g = gg.slice();
  for (let i = 0; i < NO_OF_ROW; i++) {
    // let l = NO_OF_COL * i;
    // let r = l + NO_OF_COL - 1;
    let walls = getRndInteger(13, 18);

    for (let j = 0; j < walls; j++) {
      var t = getRndInteger(0, NO_OF_COL - 1);

      while (g[i][t].isWall === true || checkStartOrEnd(i, t, c)) {
        t = getRndInteger(0, NO_OF_COL - 1);
      }
      g[i][t].isWall = true;
    }
  }
  return g;
}

// Randomly select a node (or cell) N.
// Push the node N onto a queue Q.
// Mark the cell N as visited.
// Randomly select an adjacent cell A of node N that has not been visited. If all the neighbors of N have been visited:
// Continue to pop items off the queue Q until a node is encountered with at least one non-visited neighbor - assign this node to N and go to step 4.
// If no nodes exist: stop.
// Break the wall between N and A.
// Assign the value A to N.
// Go to step 2.
