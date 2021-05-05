// TODO: not done yet

function getDirectedAdjList(n: number, edges: number[][]): number[][] {
  const undirectedAdjList: Set<number>[] = [];
  for (let i = 0; i < n; i++) {
    undirectedAdjList.push(new Set());
  }
  for (const [node1, node2] of edges) {
    undirectedAdjList[node1].add(node2);
    undirectedAdjList[node2].add(node1);
  }
  // console.log(undirectedAdjList)

  const children: number[][] = [];
  const parentQueue = [0];
  const parentsSeen = new Set([0]);
  while (parentQueue.length > 0) {
    const parent = parentQueue.shift()!;
    children[parent] = [];
    for (const connectedNode of undirectedAdjList[parent]) {
      if (!parentsSeen.has(connectedNode)) {
        children[parent].push(connectedNode);
        parentQueue.push(connectedNode);
        parentsSeen.add(connectedNode);
      }
    }
  }
  return children;
}

function countSubTrees(n: number, edges: number[][], labels: string): number[] {
  const children: number[][] = getDirectedAdjList(n, edges);
  // console.log(children)

  const result = [];
  for (let i = 0; i < n; i++) {
    const labelToFind = labels[i];
    let count = 1;
    const stack = [...children[i]];
    while (stack.length > 0) {
      const child = stack.pop()!;
      if (labels[child] === labelToFind) {
        count++;
      }
      stack.push(...children[child]);
    }
    result[i] = count;
  }
  return result;
}
