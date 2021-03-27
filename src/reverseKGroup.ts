/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode } from './leetcode-types';

function reverseGroup(
  head: ListNode,
  tail: ListNode,
  nextHead: ListNode | null
): ListNode {
  const tailAfterReversal = head;
  let prev = nextHead;
  let curr = head;

  while (curr !== tail) {
    const originalNext = curr.next;
    curr.next = prev;
    prev = curr;
    curr = originalNext!;
  }
  curr.next = prev;
  return tailAfterReversal;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let currHead = head;
  if (currHead === null || k <= 1) {
    return head;
  }
  let currListNodeCount = 1;
  let currTail = currHead;
  while (currListNodeCount < k) {
    currTail = currTail.next!;
    if (currTail === null) {
      return head;
    }
    currListNodeCount++;
  }
  head = currTail;
  let nextHead = currTail.next;
  const tailAfterReversal = reverseGroup(currHead, currTail, nextHead);
  tailAfterReversal.next = reverseKGroup(nextHead, k);
  return head;
}
