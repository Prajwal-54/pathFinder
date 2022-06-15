export function dfs(graph, start, end, forMaze) {
  var path = [];
  var reached = false;
  reached = startDfs(graph, start, end, path, reached, forMaze);
  // console.log(path);
  return { path, reached };
}
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
function startDfs(g, s, end, path, reached, forMaze) {
  // console.log(s);
  if (s === end) return true;
  if (s.isWall) return false;
  s.isVisited = true;
  path.push(s);
  const neighbors = getUnvisitedNeighbors(s, g, forMaze);
  for (const n of neighbors) {
    if (n.isVisited === false) {
      n.previousNode = s;
      if (startDfs(g, n, end, path, reached, forMaze)) return true;
    }
  }
  return false;
}

function getUnvisitedNeighbors(node, graph, forMaze) {
  var neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (col > 0) neighbors.push(graph[row][col - 1]);

  neighbors.filter((neighbor) => !neighbor.isVisited);
  return forMaze === true ? shuffle(neighbors) : neighbors;
}

export function getNodesInShortestPathOrderDfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
