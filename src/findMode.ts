import { TreeNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function* inorderTraversal(node: TreeNode): IterableIterator<number> {
  if (node.left !== null) {
    for (const nextVal of inorderTraversal(node.left)) {
      yield nextVal;
    }
  }

  yield node.val;

  if (node.right !== null) {
    for (const nextVal of inorderTraversal(node.right)) {
      yield nextVal;
    }
  }
}

function findMode(root: TreeNode | null): number[] {
  // In-order traversal: L C R
  // Assuming it's a BST, inorder traversal will list the numbers in order
  if (root === null) {
    return [];
  }

  let maxFreq = 0;
  let maxModes: number[] = [];
  let currNum = 123456789; // doesnt matter
  let currFreq = 0;

  const nums = inorderTraversal(root);
  let nextNum: { value: number; done?: boolean } = nums.next();
  while (true) {
    currNum = nextNum.value;
    currFreq = 0;

    while (currNum === nextNum.value) {
      currFreq++;
      nextNum = nums.next();
    }

    if (currFreq > maxFreq) {
      maxModes = [currNum];
      maxFreq = currFreq;
    } else if (currFreq === maxFreq) {
      maxModes.push(currNum);
    }

    if (nextNum.done) {
      break;
    }
  }
  return maxModes;
}

describe(findMode.name, () => {
  const testCases: TestCase<TreeNode | null, number[]>[] = [
    new TestCase(deserializeTreeFromArray([1, null, 2, 2]), [2]),
    new TestCase(deserializeTreeFromArray([0]), [0]),
    new TestCase(deserializeTreeFromArray([2, 1, 3, 1, null, null, 3]), [1, 3]),
    new TestCase(
      deserializeTreeFromArray([
        2,
        1,
        3,
        1,
        null,
        null,
        3,
        null,
        null,
        null,
        4,
        4,
        4,
      ]),
      [4]
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = findMode(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
