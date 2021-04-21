import { TreeNode } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';
import { deserializeTree } from './treeSerialization';

function bstInsert(node: TreeNode | null, val: number): TreeNode {
  if (node === null) {
    return new TreeNode(val);
  }
  if (val >= node.val) {
    if (node.right === null) {
      node.right = new TreeNode(val);
    } else {
      bstInsert(node.right, val);
    }
  } else {
    if (node.left === null) {
      node.left = new TreeNode(val);
    } else {
      bstInsert(node.left, val);
    }
  }
  return node;
}

export enum RedBlackTreeColor {
  Red,
  Black,
}

export class RedBlackTreeNode extends TreeNode {
  constructor(
    val: number,
    public color: RedBlackTreeColor,
    left?: TreeNode | null,
    right?: TreeNode | null
  ) {
    super(val, left, right);
  }

  insert(val: number) {}

  delete(val: number) {}
}

describe(`${RedBlackTreeNode.name}.${RedBlackTreeNode.prototype.insert.name}`, () => {
  const testCases: TestCase<string, string>[] = [
    new TestCase('asdf', 'asdf', 'medium tree, rotate right'),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = testCase.input;
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

describe(bstInsert.name, () => {
  const testCases: TestCase<[TreeNode | null, number], TreeNode>[] = [
    new TestCase([null, 1], deserializeTree([1])!),
    new TestCase(
      [deserializeTree([1]), 2],
      deserializeTree([1, null, 2])!,
      '1 node, inserting something greater goes to the right'
    ),
    new TestCase(
      [deserializeTree([1]), 0],
      deserializeTree([1, 0])!,
      '1 node, inserting something less goes to the left'
    ),
    new TestCase(
      [deserializeTree([1]), 1],
      deserializeTree([1, null, 1])!,
      '1 node, inserting something equal goes to the right'
    ),
    new TestCase(
      [deserializeTree([4, 2, 8, null, null, 6]), 3],
      deserializeTree([4, 2, 8, null, 3, 6])!,
      'can go down the tree left right'
    ),
    new TestCase(
      [deserializeTree([4, 2, 8, null, null, 6]), 7],
      deserializeTree([4, 2, 8, null, null, 6, null, null, 7])!,
      'can go down the tree right left right'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = bstInsert(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
