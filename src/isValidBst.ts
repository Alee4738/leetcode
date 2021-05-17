import { TreeNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function isValidHelper(node: TreeNode | null, prevValue: number[]): boolean {
  if (node === null) {
    return true;
  } else {
    if (!isValidHelper(node.left, prevValue)) {
      return false;
    }

    if (prevValue[0] >= node.val) {
      return false;
    }

    prevValue[0] = node.val;
    return isValidHelper(node.right, prevValue);
  }
}

function isValidBST(root: TreeNode | null): boolean {
  // Inorder traversal: L Curr R
  // Look in that order, keep track of the prev val you've seen. If prev >= curr, then it's invalid
  return isValidHelper(root, [-Infinity]);
}

describe(isValidBST.name, () => {
  const testCases: TestCase<TreeNode | null, boolean>[] = [
    new TestCase(deserializeTreeFromArray([2, 1, 3]), true),
    new TestCase(deserializeTreeFromArray([5, 1, 4, null, null, 3, 6]), false),
    new TestCase(deserializeTreeFromArray([5]), true),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = isValidBST(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
