import { GraphNode as Node } from './leetcodeTypes';

function cloneGraph(node: Node | null): Node | null {
  if (node === null) {
    return null;
  }

  // basically, we can do BFS or DFS to discover all the nodes
  // choose BFS because I have a feeling that it'll take less memory
  const nodes: (Node | undefined)[] = [undefined, new Node(node.val)];
  const seen = new Set<number>();
  const queue: Node[] = [node];
  while (queue.length > 0) {
    const { val, neighbors } = queue.shift()!;
    // console.log('Processing node', val, 'neighbors', neighbors.map(n => n.val))
    const isNodeAlreadySeen = seen.has(val);
    if (isNodeAlreadySeen) {
      // console.log('already seen, skip')
      continue;
    }

    const partialNodeToBuild = nodes[val]!;
    for (const neighbor of neighbors) {
      const partialNeighbor = nodes[neighbor.val] ?? new Node(neighbor.val);
      partialNodeToBuild.neighbors.push(partialNeighbor);
      nodes[neighbor.val] = partialNeighbor;
      queue.push(neighbor);
    }
    // console.log('built node', partialNodeToBuild.val, 'neighbors', partialNodeToBuild.neighbors.map(n => n.val))
    seen.add(val);
    // console.log(seen)
    // console.log(nodes)
  }
  return nodes[1]!;
}

/*
Each array is a 1-indexed adjacency list
e.g. for [[2,4],[1,3],[2,4],[1,3]], then List[1] = [2,4], which means node 1 has neighbors 2 and 4

[[2,4],[1,3],[2,4],[1,3]]
[[]]
[]
[[2],[1]]
*/
