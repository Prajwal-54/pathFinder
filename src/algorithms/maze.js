const NO_OF_ROW = 20;
const NO_OF_COL = 60;
const S_ROW = 10;
const S_COL = 16;
const F_ROW = 10;
const F_COL = 45;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getNeighbors(node, graph) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (col > 0) neighbors.push(graph[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
  // shuffle(neighbors);
  // return neighbors;
}

function allPathsDFS(g, start, end, curpath, allPaths) {
  if (allPaths.length > 20 || curpath.length > 30) return;
  curpath.push(start);

  if (start === end) {
    allPaths.push(curpath);
    console.log("curpath");
  } else {
    const n = getNeighbors(start, g);

    for (const ng of n) {
      allPathsDFS(g, ng, end, curpath, allPaths);
    }
  }
  curpath.pop();
}

export function maze(g) {
  const start = g[S_ROW][S_COL];
  const end = g[F_ROW][F_COL];
  const allPaths = [];
  const curpath = [];

  // allPathsDFS(g, start, end, curpath, allPaths);
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
    let walls = getRndInteger(15, 20);

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
