/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/

import { ListNode } from './leetcodeTypes';

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // TODO: incorporate carry

  function helper(
    l1: ListNode | null,
    l2: ListNode | null,
    carry: number
  ): ListNode | null {
    if (l1 === null && l2 === null) {
      if (carry > 0) {
        return new ListNode(carry, null);
      } else {
        return null;
      }
    }

    // use default values that will make the addition and recursion work
    const l1Val = l1?.val ?? 0;
    const l1Next = l1?.next ?? null;
    const l2Val = l2?.val ?? 0;
    const l2Next = l2?.next ?? null;

    let lastDigit = l1Val + l2Val + carry;
    let nextCarry = 0;
    if (lastDigit >= 10) {
      lastDigit -= 10;
      nextCarry = 1;
    }

    return new ListNode(lastDigit, helper(l1Next, l2Next, nextCarry));
  }

  return helper(l1, l2, 0);
}

class LocalTestCase {
  constructor(
    public description: string,
    public list1: ListNode | null,
    public list2: ListNode | null,
    public expectedList: ListNode | null
  ) {}
}

describe(addTwoNumbers.name, () => {
  // lists of length of 0, 1, 2+
  const testCases = [
    new LocalTestCase(
      '0 + 0 = 0',
      new ListNode(0, null),
      new ListNode(0, null),
      new ListNode(0, null)
    ),
    new LocalTestCase(
      '0 + 12 = 12',
      new ListNode(0, null),
      new ListNode(2, new ListNode(1, null)),
      new ListNode(2, new ListNode(1, null))
    ),
    new LocalTestCase(
      '42 + 103 = 145',
      new ListNode(2, new ListNode(4, null)),
      new ListNode(3, new ListNode(0, new ListNode(1, null))),
      new ListNode(5, new ListNode(4, new ListNode(1, null)))
    ),
    new LocalTestCase(
      '1 + 103 = 104',
      new ListNode(1, null),
      new ListNode(3, new ListNode(0, new ListNode(1, null))),
      new ListNode(4, new ListNode(0, new ListNode(1, null)))
    ),
    new LocalTestCase(
      'nothing + 103 = 103',
      null,
      new ListNode(3, new ListNode(0, new ListNode(1, null))),
      new ListNode(3, new ListNode(0, new ListNode(1, null)))
    ),
    new LocalTestCase(
      'Carry a 1 once, 9 + 9 = 18',
      new ListNode(9, null),
      new ListNode(9, null),
      new ListNode(8, new ListNode(1, null))
    ),
    new LocalTestCase(
      'Carry a 1 multiple times, 99 + 99 = 198',
      new ListNode(9, new ListNode(9, null)),
      new ListNode(9, new ListNode(9, null)),
      new ListNode(8, new ListNode(9, new ListNode(1, null)))
    ),
  ];

  testCases.forEach((testCase: LocalTestCase) => {
    it(testCase.description, () => {
      const actualList = addTwoNumbers(testCase.list1, testCase.list2);
      expect(actualList).toEqual(testCase.expectedList);
    });
  });
});
