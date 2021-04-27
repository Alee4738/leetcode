import { TreeNode } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';
import { makeTreeFromArray, newTreeNode } from './treeSerialization';

class TreeNodeWithParent extends TreeNode {
  left: TreeNodeWithParent | null;
  right: TreeNodeWithParent | null;
  parent: TreeNodeWithParent | null;

  constructor(
    val: number,
    left?: TreeNodeWithParent | null,
    right?: TreeNodeWithParent | null,
    parent?: TreeNodeWithParent | null
  ) {
    super(val, left, right);
    this.left = left ?? null;
    this.right = right ?? null;
    this.parent = parent ?? null;
  }
}

export enum RedBlackTreeNodeColor {
  Red,
  Black,
}

export class RedBlackTreeNode extends TreeNodeWithParent {
  constructor(
    val: number,
    public color: RedBlackTreeNodeColor,
    left?: RedBlackTreeNode | null,
    right?: RedBlackTreeNode | null,
    parent?: RedBlackTreeNode | null
  ) {
    super(val, left, right, parent);
  }
}

/**
 * @returns an array [root of the tree, node created]
 */
function bstInsert(
  tree: TreeNode | null,
  val: number,
  createNode: (val: number, parent: TreeNode | null) => TreeNode = newTreeNode
): [TreeNode, TreeNode] {
  if (tree === null) {
    const newTree = createNode(val, null);
    return [newTree, newTree];
  }
  let newNode: TreeNode | undefined;
  if (val >= tree.val) {
    if (tree.right === null) {
      tree.right = newNode = createNode(val, tree);
    } else {
      // cast is needed to satisfy compiler
      const result = bstInsert(tree.right, val, createNode);
      newNode = result[1];
    }
  } else {
    if (tree.left === null) {
      tree.left = newNode = createNode(val, tree);
    } else {
      // cast is needed to satisfy compiler
      const result = bstInsert(tree.left, val, createNode);
      newNode = result[1];
    }
  }
  return [tree, newNode];
}

function createRedBlackTreeNode(
  val: number,
  parent: TreeNode | null
): RedBlackTreeNode {
  if (parent === null) {
    return new RedBlackTreeNode(val, RedBlackTreeNodeColor.Black);
  }
  return new RedBlackTreeNode(
    val,
    RedBlackTreeNodeColor.Red,
    null,
    null,
    parent as RedBlackTreeNode
  );
}

/**
 * @returns the root of the tree
 */
function redBlackTreeInsert(
  tree: RedBlackTreeNode | null,
  val: number
): RedBlackTreeNode {
  if (tree === null) {
    return new RedBlackTreeNode(val, RedBlackTreeNodeColor.Black);
  }
  bstInsert(tree, val, createRedBlackTreeNode);
  // TODO: implement
  // Look at the parent, grandparent, and uncle
  // if the parent is black, then return
  // if the parent is red, then
  // if uncle is red, then
  // if uncle is black, then
  //
  return tree;
}

describe(redBlackTreeInsert.name, () => {
  it('root', () => {
    // Arrange
    const initialTree = null;
    const valToInsert = 20;

    // Act
    const actualTree = redBlackTreeInsert(initialTree, valToInsert);

    // Assert
    const expectedTree = new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black);
    expect(actualTree).toEqual(expectedTree);
  });

  it('root, add left', () => {
    // Arrange
    // prettier-ignore
    const initialTree = new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black);
    const valToInsert = 0;

    // Act
    const actualTree = redBlackTreeInsert(initialTree, valToInsert);

    // Assert
    // prettier-ignore
    const expectedTree =
      new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black,
        new RedBlackTreeNode(0, RedBlackTreeNodeColor.Red)
      );
    expectedTree.left!.parent = expectedTree;
    expect(actualTree).toEqual(expectedTree);
  });

  it('root, add right', () => {
    // Arrange
    // prettier-ignore
    const initialTree = new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black);
    const valToInsert = 30;

    // Act
    const actualTree = redBlackTreeInsert(initialTree, valToInsert);

    // Assert
    // prettier-ignore
    const expectedTree =
      new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black,
        null,
        new RedBlackTreeNode(30, RedBlackTreeNodeColor.Red)
      );
    expectedTree.right!.parent = expectedTree;
    expect(actualTree).toEqual(expectedTree);
  });

  it('rotate a left-left', () => {
    // // Arrange
    // const initialTree = null;
    // const valToInsert = 20;
    // // Act
    // const actualTree = redBlackTreeInsert(initialTree, valToInsert);
    // // Assert
    // const expectedTree = new RedBlackTreeNode(20, RedBlackTreeNodeColor.Black);
    // expect(actualTree).toEqual(expectedTree);
  });

  // Cases from https://www.youtube.com/watch?v=qA02XWRTBdw
  // Order: 18, 7, 15, 16, 30, 25, 40, 60, 2, 1, 70
});

describe(bstInsert.name, () => {
  const testCases: TestCase<
    [TreeNode | null, number],
    [TreeNode, TreeNode]
  >[] = [
    new TestCase([null, 1], [makeTreeFromArray([1])!, makeTreeFromArray([1])!]),
    new TestCase(
      [makeTreeFromArray([1]), 2],
      [makeTreeFromArray([1, null, 2])!, makeTreeFromArray([2])!],
      '1 node, inserting something greater goes to the right'
    ),
    new TestCase(
      [makeTreeFromArray([1]), 0],
      [makeTreeFromArray([1, 0])!, makeTreeFromArray([0])!],
      '1 node, inserting something less goes to the left'
    ),
    new TestCase(
      [makeTreeFromArray([1]), 1],
      [makeTreeFromArray([1, null, 1])!, makeTreeFromArray([1])!],
      '1 node, inserting something equal goes to the right'
    ),
    new TestCase(
      [makeTreeFromArray([4, 2, 8, null, null, 6]), 3],
      [makeTreeFromArray([4, 2, 8, null, 3, 6])!, makeTreeFromArray([3])!],
      'can go down the tree left right'
    ),
    new TestCase(
      [makeTreeFromArray([4, 2, 8, null, null, 6]), 7],
      [
        makeTreeFromArray([4, 2, 8, null, null, 6, null, null, 7])!,
        makeTreeFromArray([7])!,
      ],
      'can go down the tree right left right'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = bstInsert(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
