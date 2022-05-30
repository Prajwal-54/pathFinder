export function dfs(graph, start, end) {
  var path = [];
  var reached = false;
  reached = startDfs(graph, start, end, path, reached);
  // console.log(path);
  return { path, reached };
}

function startDfs(g, s, end, path, reached) {
  // console.log(s);
  if (s === end) return true;
  if (s.isWall) return false;
  s.isVisited = true;
  path.push(s);
  const neighbors = getUnvisitedNeighbors(s, g);
  for (const n of neighbors) {
    if (n.isVisited === false) {
      n.previousNode = s;
      if (startDfs(g, n, end, path, reached)) return true;
    }
  }
  return false;
}

function getUnvisitedNeighbors(node, graph) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (col > 0) neighbors.push(graph[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
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
