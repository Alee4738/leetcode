import { TreeNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function fillUpFrequencies(
  node: TreeNode | null,
  freqByNumber: Map<number, number>
): void {
  if (node === null) {
    return;
  } else {
    fillUpFrequencies(node.left, freqByNumber);

    let freq = freqByNumber.get(node.val) ?? 0;
    freq++;
    freqByNumber.set(node.val, freq);

    // Idea: drop off modes that you know will not change and are not the current mode, don't need to store them anymore
    //

    fillUpFrequencies(node.right, freqByNumber);
  }
}

function findMode(root: TreeNode | null): number[] {
  // In-order traversal: L C R
  // Assuming it's a BST, inorder traversal will list the numbers in order
  const freqs = new Map<number, number>();
  fillUpFrequencies(root, freqs);

  let maxFreq = 0;
  let modes: number[] = [];
  for (const [num, freq] of freqs) {
    if (freq === maxFreq) {
      modes.push(num);
    } else if (freq > maxFreq) {
      maxFreq = freq;
      modes = [num];
    }
  }
  return modes;
}

describe(findMode.name, () => {
  const testCases: TestCase<TreeNode | null, number[]>[] = [
    new TestCase(deserializeTreeFromArray([1, null, 2, 2]), [2]),
    new TestCase(deserializeTreeFromArray([0]), [0]),
    new TestCase(deserializeTreeFromArray([2, 1, 3, 1, null, null, 3]), [1, 3]),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = findMode(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
