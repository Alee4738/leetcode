import { NaryTreeNode as Node } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';
import { deserializeNaryTreeFromArray } from './treeSerialization';

function helper(node: Node | null, currDepth: number): number {
  if (node === null) {
    return currDepth;
  }
  let nextDepth = currDepth + 1;
  let currMax = nextDepth;
  for (const child of node.children) {
    currMax = Math.max(helper(child, nextDepth), currMax);
  }
  return currMax;
}

function maxDepth(root: Node | null): number {
  return helper(root, 0);
}

describe(maxDepth.name, () => {
  const testCases: TestCase<Node | null, number>[] = [
    new TestCase(
      deserializeNaryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]),
      3
    ),
    new TestCase(deserializeNaryTreeFromArray([]), 0),
    new TestCase(deserializeNaryTreeFromArray([1]), 1),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = maxDepth(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
