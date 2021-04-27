import { TreeNode } from './leetcodeTypes';
import { FTestCase, TestCase, XTestCase } from './testHelpers';
import { makeTreeFromArray } from './treeSerialization';

export enum RotateDirection {
  Left,
  Right,
}

/**
 * Rotate a binary search tree by the root
 * @param root root of the tree
 */
export function rotateBst(
  root: TreeNode | null,
  direction: RotateDirection
): TreeNode | null {
  if (root === null) {
    return null;
  }
  let newRoot = root;
  if (direction === RotateDirection.Left && root.right !== null) {
    newRoot = root.right;
    root.right = root.right.left;
    newRoot.left = root;
  } else if (direction === RotateDirection.Right && root.left !== null) {
    newRoot = root.left;
    root.left = root.left.right;
    newRoot.right = root;
  }
  return newRoot;
}

describe(rotateBst.name, () => {
  const testCases: TestCase<
    [TreeNode | null, RotateDirection],
    TreeNode | null
  >[] = [
    new TestCase([null, RotateDirection.Left], null),
    new TestCase(
      [makeTreeFromArray([1]), RotateDirection.Right],
      makeTreeFromArray([1]),
      'rotating a single node does nothing'
    ),
    new TestCase(
      [makeTreeFromArray([2, 1]), RotateDirection.Right],
      makeTreeFromArray([1, null, 2]),
      '2 nodes'
    ),
    new TestCase(
      [makeTreeFromArray([2, 1, 3]), RotateDirection.Left],
      makeTreeFromArray([3, 2, null, 1]),
      '3 nodes'
    ),
    new TestCase(
      [makeTreeFromArray([2, 1]), RotateDirection.Left],
      makeTreeFromArray([2, 1]),
      'tree that cannot be rotated left returns the same tree'
    ),
    new TestCase(
      [makeTreeFromArray([4, null, 8, 6, 10]), RotateDirection.Left],
      makeTreeFromArray([8, 4, 10, null, 6]),
      'when rotate right, root.right.left becomes newRoot.left.right'
    ),
    new TestCase(
      [makeTreeFromArray([10, 6, null, 4, 8]), RotateDirection.Right],
      makeTreeFromArray([6, 4, 10, null, null, 8]),
      'when rotate left, root.left.right becomes newRoot.right.left'
    ),
    new TestCase(
      [
        // prettier-ignore
        makeTreeFromArray([
          6,
          2, 10,
          1, 4, 8, 14,
          null,null,null,5,null,9,12,
        ]),
        RotateDirection.Left,
      ],
      // prettier-ignore
      makeTreeFromArray([
        10,
        6, 14,
        2, 8, 12, null,
        1, 4, null, 9, null,null,
        null,null,null,5
      ]),
      'medium tree, rotate left'
    ),
    new TestCase(
      [
        // prettier-ignore
        makeTreeFromArray([
          6,
          2, 10,
          1, 4, 8, 14,
          null,null,null,5,null,9,12,
        ]),
        RotateDirection.Right,
      ],
      // prettier-ignore
      makeTreeFromArray([
        2,
        1, 6,
        null,null,4, 10,
        null,5,8,14,
        null,null,null,9,12,
      ]),
      'medium tree, rotate right'
    ),
  ];

  testCases.forEach((testCase) => {
    const run = () => {
      const actualResult = rotateBst(...testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    };
    if (testCase instanceof FTestCase) {
      fit(testCase.desc ?? 'None', run);
    } else if (!(testCase instanceof XTestCase)) {
      it(testCase.desc ?? 'None', run);
    }
  });
});
