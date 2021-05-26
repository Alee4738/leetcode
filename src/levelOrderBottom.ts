import { TreeNode } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function levelOrderBottom(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }
  // post-order traversal does something like that
  // to do level order traversal, you put yourself in the queue, then your children
  // when you take out of the queue, then print yourself
  // Imagine doing classic level order traversal

  // Now, don't dequeue the node, just move a pointer across
  // That gets me top-down level-order traversal.
  const levelOrderTop = [root];
  let cur = 0;
  const levels = [0];
  while (cur < levelOrderTop.length) {
    // console.log('cur', cur)
    // console.log('levelOrderTop', levelOrderTop)
    const node = levelOrderTop[cur];
    const level = levels[cur];
    const nextLevel = level + 1;
    if (node.left) {
      levelOrderTop.push(node.left);
      levels.push(nextLevel);
    }
    if (node.right) {
      levelOrderTop.push(node.right);
      levels.push(nextLevel);
    }
    cur++;
  }

  const levelFreq = new Map<number, number>();
  for (const level of levels) {
    let count = levelFreq.get(level) ?? 0;
    count++;
    levelFreq.set(level, count);
  }
  const lastLevel = levels[levels.length - 1];
  let startOfCurrentBottomLevel = levels.length;
  const result = [];
  for (let level = lastLevel; level >= 0; level--) {
    const freqOfLevel = levelFreq.get(level);
    if (freqOfLevel === undefined) {
      throw new Error(`level not found ${level}`);
    }
    const startOfNextBottomLevel = startOfCurrentBottomLevel - freqOfLevel;
    const arr = [];
    for (let i = startOfNextBottomLevel; i < startOfCurrentBottomLevel; i++) {
      arr.push(levelOrderTop[i].val);
    }
    result.push(arr);
    startOfCurrentBottomLevel = startOfNextBottomLevel;
  }
  return result;
}

describe(levelOrderBottom.name, () => {
  const testCases: TestCase<TreeNode | null, number[][]>[] = [
    new TestCase(deserializeTreeFromArray([3, 9, 20, null, null, 15, 7]), [
      [15, 7],
      [9, 20],
      [3],
    ]),
    new TestCase(deserializeTreeFromArray([1]), [[1]]),
    new TestCase(deserializeTreeFromArray([]), []),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = levelOrderBottom(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
