import { TreeNode, ListNode } from './leetcodeTypes';
import { TestCase, runTests } from './testHelpers';
import { deserializeTreeFromArray } from './treeSerialization';

function makeBst(start: number, end: number, arr: number[]): TreeNode | null {
  if (start >= end) {
    return null;
  }
  const mid = Math.floor((start + end) / 2);
  const root = new TreeNode(arr[mid]);
  root.left = makeBst(start, mid, arr);
  root.right = makeBst(mid + 1, end, arr);
  return root;
}

function sortedListToBST(head: ListNode | null): TreeNode | null {
  if (head === null) {
    return null;
  }
  const arr: number[] = [];
  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }

  const tree = makeBst(0, arr.length, arr);
  return tree;
}

describe(sortedListToBST.name, () => {
  const testCases: TestCase<ListNode | null, TreeNode | null>[] = [
    new TestCase(
      // prettier-ignore
      new ListNode(-10,
      new ListNode(-3,
      new ListNode(0,
      new ListNode(5,
      new ListNode(9))))),
      deserializeTreeFromArray([0, -3, 9, -10, null, 5])
    ),
    new TestCase(
      // prettier-ignore
      null,
      deserializeTreeFromArray([])
    ),
    new TestCase(
      // prettier-ignore
      new ListNode(0),
      deserializeTreeFromArray([0])
    ),
    new TestCase(
      // prettier-ignore
      new ListNode(1,
      new ListNode(3)),
      deserializeTreeFromArray([3, 1])
    ),
    new TestCase(
      // prettier-ignore
      new ListNode(1,
      new ListNode(2,
      new ListNode(3,
      new ListNode(4
      )))),
      deserializeTreeFromArray([3, 2, 4, 1])
    ),
    new TestCase(
      // prettier-ignore
      new ListNode(1,
      new ListNode(2,
      new ListNode(3,
      new ListNode(4,
      new ListNode(5,
      new ListNode(6,
      )))))),
      deserializeTreeFromArray([4, 2, 6, 1, 3, 5])
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = sortedListToBST(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
