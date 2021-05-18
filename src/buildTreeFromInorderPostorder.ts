import { TreeNode } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function buildHelper(
  inorder: number[],
  postorder: number[],
  inStart: number,
  inEnd: number,
  postStart: number,
  postEnd: number
): TreeNode | null {
  if (inStart >= inEnd || postStart >= postEnd) {
    return null;
  }
  const rootVal = postorder[postEnd - 1];
  const rootOfSubTree = new TreeNode(rootVal);
  let inIndexOfRoot = inEnd - 1;
  for (let i = inStart; i < inEnd; i++) {
    if (inorder[i] === rootVal) {
      inIndexOfRoot = i;
      break;
    }
  }

  const leftInStart = inStart;
  const leftInEnd = inIndexOfRoot;
  const lengthOfLeftSubtree = leftInEnd - leftInStart;

  const rightInStart = inIndexOfRoot + 1;
  const rightInEnd = inEnd;
  const lengthOfRightSubtree = rightInEnd - rightInStart;

  const leftPostStart = postStart;
  const leftPostEnd = postStart + lengthOfLeftSubtree;

  const rightPostStart = leftPostEnd;
  const rightPostEnd = postEnd - 1;

  rootOfSubTree.left = buildHelper(
    inorder,
    postorder,
    leftInStart,
    leftInEnd,
    leftPostStart,
    leftPostEnd
  );
  rootOfSubTree.right = buildHelper(
    inorder,
    postorder,
    rightInStart,
    rightInEnd,
    rightPostStart,
    rightPostEnd
  );

  return rootOfSubTree;
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  return buildHelper(
    inorder,
    postorder,
    0,
    inorder.length,
    0,
    postorder.length
  );
}

describe(buildTree.name, () => {
  const testCases: TestCase<[number[], number[]], TreeNode | null>[] = [
    new TestCase(
      [
        [9, 3, 15, 20, 7],
        [9, 15, 7, 20, 3],
      ],
      deserializeTreeFromArray([3, 9, 20, null, null, 15, 7])
    ),
    new TestCase([[-1], [-1]], deserializeTreeFromArray([-1])),
    new TestCase(
      [
        [6, 4, 2, 5, 8, 7, 1, 3, 9],
        [6, 4, 8, 7, 5, 2, 9, 3, 1],
      ],
      deserializeTreeFromArray([
        1,
        2,
        3,
        4,
        5,
        null,
        9,
        6,
        null,
        null,
        7,
        null,
        null,
        null,
        null,
        8,
      ])
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = buildTree(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
