import { TreeNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function traverse(node: TreeNode | null, result: number[]): void {
  if (node === null) {
    return;
  } else {
    traverse(node.left, result);
    result.push(node.val);
    traverse(node.right, result);
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  // Inorder traversal: L Curr R
  const result: number[] = [];
  traverse(root, result);
  return result;
}

describe(inorderTraversal.name, () => {
  const testCases: TestCase<TreeNode | null, number[]>[] = [
    new TestCase(deserializeTreeFromArray([1, null, 2, 3]), [1, 3, 2]),
    new TestCase(deserializeTreeFromArray([]), []),
    new TestCase(deserializeTreeFromArray([1]), [1]),
    new TestCase(deserializeTreeFromArray([1, 2]), [2, 1]),
    new TestCase(deserializeTreeFromArray([1, null, 2]), [1, 2]),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = inorderTraversal(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
