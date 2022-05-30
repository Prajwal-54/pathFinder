export function bfs(graph, start, end) {
  const path = [];
  start.distance = 0;

  const unvisited = [];
  let reached = false;

  for (const row of graph) {
    for (const node of row) {
      unvisited.push(node);
    }
  }
  while (!!unvisited.length) {
    sortNodesByDistance(unvisited);
    const closestNode = unvisited.shift();

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return { path, reached }; //not reachable

    closestNode.isVisited = true;
    path.push(closestNode);
    if (closestNode === end) {
      reached = true;
      return { path, reached };
    }
    updateUnvisitedNeighbors(closestNode, graph);
  }
}

function sortNodesByDistance(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(node, graph) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, graph);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, graph) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (col > 0) neighbors.push(graph[row][col - 1]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
