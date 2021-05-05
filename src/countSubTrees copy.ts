// TODO: not done yet

// function getDirectedAdjList(n: number, edges: number[][]): number[][] {
//   const undirectedAdjList: Set<number>[] = [];
//   for (let i = 0; i < n; i++) {
//     undirectedAdjList.push(new Set());
//   }
//   for (const [node1, node2] of edges) {
//     undirectedAdjList[node1].add(node2);
//     undirectedAdjList[node2].add(node1);
//   }
//   // console.log(undirectedAdjList)

//   const children: number[][] = [];
//   const parentQueue = [0];
//   const parentsSeen = new Set([0]);
//   while (parentQueue.length > 0) {
//     const parent = parentQueue.shift()!;
//     children[parent] = [];
//     for (const connectedNode of undirectedAdjList[parent]) {
//       if (!parentsSeen.has(connectedNode)) {
//         children[parent].push(connectedNode);
//         parentQueue.push(connectedNode);
//         parentsSeen.add(connectedNode);
//       }
//     }
//   }
//   return children;
// }

// function countSymbols(
//   rootNode: number,
//   children: number[][],
//   labels: string,
//   cache: { [label: string]: number }[]
// ): { [label: string]: number } {
//   if (cache[rootNode] !== undefined) {
//     return cache[rootNode];
//   }
//   const myChildren = children[rootNode];
//   const myCounts: { [label: string]: number } = {};
//   for (const child of myChildren) {
//     const childCounts = countSymbols(child, children, labels, cache);
//     Object.entries(childCounts).forEach(([label, count]) => {
//       if (myCounts[label] === undefined) {
//         myCounts[label] = 0;
//       }
//       myCounts[label] += count;
//     });
//   }
//   const myLabel = labels[rootNode];
//   if (myCounts[myLabel] === undefined) {
//     myCounts[myLabel] = 0;
//   }
//   myCounts[myLabel] += 1;
//   cache[rootNode] = myCounts;
//   return myCounts;
// }

// function countSymbolsOfSubTrees(
//   children: number[][],
//   labels: string
// ): { [label: string]: number }[] {
//   const cache: { [label: string]: number }[] = [];
//   countSymbols(0, children, labels, cache);
//   return cache;
// }

// function countSubTrees(n: number, edges: number[][], labels: string): number[] {
//   const children: number[][] = getDirectedAdjList(n, edges);
//   // console.log(children)

//   // const countsOfSymbolsOfSubTrees: {
//   //   [label: string]: number;
//   // }[] = countSymbolsOfSubTrees(children, labels);
//   // // console.log(countsOfSymbolsOfSubTrees);

//   // return countsOfSymbolsOfSubTrees.map((countOfAllSymbols, i) => {
//   //   return countOfAllSymbols[labels[i]];
//   // });

//   const result = [];
//   for (let i = 0; i < n; i++) {
//     const labelToFind = labels[i];
//     let count = 1;
//     let stack = [...children[i]];
//     while (stack.length > 0) {
//       const child = stack.pop();
//       if (labels[child] === labelToFind) {
//         count++;
//       }
//       stack = stack.concat(children[child]);
//     }
//     result[i] = count;
//   }
//   return result;
// }
