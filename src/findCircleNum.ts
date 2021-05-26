import { TestCase, runTests } from './testHelpers';

class UnionFind {
  parents: number[];
  sizes: Map<number, number>;
  constructor(n: number) {
    this.parents = [];
    this.sizes = new Map();
    for (let i = 0; i < n; i++) {
      this.parents.push(i);
      this.sizes.set(i, 1);
    }
    // console.log('parents', this.parents);
    // console.log('sizes', this.sizes)
  }

  // Use weighted quick union
  // Add path compression later
  union(node1: number, node2: number): void {
    // console.log('union', node1, node2)
    const root1 = this.root(node1);
    const root2 = this.root(node2);
    if (root1 === root2) {
      // console.log('same root, do nothing')
      return;
    }

    const size1 = this.sizes.get(root1);
    const size2 = this.sizes.get(root2);
    if (size1 === undefined || size2 === undefined) {
      throw new Error(`Undefined sizes size1 ${size1} size2 ${size2}`);
    }

    const totalSize = size1 + size2;
    if (size1 < size2) {
      // console.log('put tree 1 under tree 2')
      this.parents[root1] = root2;
      this.sizes.set(root2, totalSize);
      this.sizes.delete(root1);
    } else {
      // console.log('put tree 2 under tree 1')
      this.parents[root2] = root1;
      this.sizes.set(root1, totalSize);
      this.sizes.delete(root2);
    }
    // console.log('parents', this.parents)
  }

  root(node: number): number {
    this.checkValidNode(node);
    let curr = node;
    while (this.parents[curr] !== curr) {
      curr = this.parents[curr];
    }
    return curr;
  }

  find(node1: number, node2: number): boolean {
    this.checkValidNode(node1);
    this.checkValidNode(node2);
    return this.root(node1) === this.root(node2);
  }

  checkValidNode(node: number): void {
    if (0 <= node && node < this.parents.length) {
      return;
    }
    throw new Error(`invalid node ${node}`);
  }
}

function findCircleNum(isConnected: number[][]): number {
  const uf = new UnionFind(isConnected.length);
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = i; j < isConnected.length; j++) {
      if (isConnected[i][j] === 1) {
        uf.union(i, j);
      }
    }
  }
  const connectedComponents = Array.from(uf.sizes.keys());
  return connectedComponents.length;
}

describe(findCircleNum.name, () => {
  const testCases: TestCase<number[][], number>[] = [
    new TestCase(
      [
        [1, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 1],
      ],
      3
    ),
    new TestCase(
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1],
      ],
      2
    ),
    new TestCase(
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      3
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = findCircleNum(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
