import { TreeNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function allPossibleFBT(n: number): Array<TreeNode | null> {
  if (n <= 0 || n % 2 === 0) {
    return [];
  }

  const cache: TreeNode[][] = [];
  cache[1] = [new TreeNode(0)];

  for (let i = 3; i <= n; i += 2) {
    const result: TreeNode[] = [];
    const availableNodesToSplit = i - 1;
    for (let leftNodes = 1; leftNodes < availableNodesToSplit; leftNodes += 2) {
      const rightNodes = availableNodesToSplit - leftNodes;
      const leftTrees = cache[leftNodes];
      const rightTrees = cache[rightNodes];
      for (const leftTree of leftTrees) {
        for (const rightTree of rightTrees) {
          const tree = new TreeNode(0, leftTree, rightTree);
          result.push(tree);
        }
      }
    }

    cache[i] = result;
  }
  return cache[n];
}

describe(allPossibleFBT.name, () => {
  const testCases: TestCase<number, (TreeNode | null)[]>[] = [
    new TestCase(1, [deserializeTreeFromArray([0])]),
    new TestCase(3, [deserializeTreeFromArray([0, 0, 0])]),
    new TestCase(6, []),
    new TestCase(7, [
      deserializeTreeFromArray([0, 0, 0, null, null, 0, 0, null, null, 0, 0]),
      deserializeTreeFromArray([0, 0, 0, null, null, 0, 0, 0, 0]),
      deserializeTreeFromArray([0, 0, 0, 0, 0, 0, 0]),
      deserializeTreeFromArray([0, 0, 0, 0, 0, null, null, null, null, 0, 0]),
      deserializeTreeFromArray([0, 0, 0, 0, 0, null, null, 0, 0]),
    ]),
    // prettier-ignore
    new TestCase(9,[
      deserializeTreeFromArray([0,0,0,null,null,0,0,null,null,0,0,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,null,null,0,0,null,null,0,0,0,0]),
      deserializeTreeFromArray([0,0,0,null,null,0,0,0,0,0,0]),
      deserializeTreeFromArray([0,0,0,null,null,0,0,0,0,null,null,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,null,null,0,0,0,0,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,0,0,null,null,null,null,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,0,0,null,null,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,0,0,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,0,0,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,null,null,null,null,0,0,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,null,null,null,null,0,0,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,null,null,0,0,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,null,null,0,0,null,null,null,null,0,0]),
      deserializeTreeFromArray([0,0,0,0,0,null,null,0,0,null,null,0,0]),
    ]),
    new TestCase(20, []),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = allPossibleFBT(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});



// 19,[[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,null,null,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,0,0,null,null,null,null,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,0,0,null,null,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,0,0,null,null,0,0],[0,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,0,0,0,0,0,0],[0,0,0,null,null,0,...
