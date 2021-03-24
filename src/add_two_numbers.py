# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
import itertools

class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        dummy_head = ListNode(0)
        curr = dummy_head

        carry = 0

        # walk through list, adding and maintaining carryover
        l1_walk, l2_walk = l1, l2
        while l1_walk or l2_walk:
            # get vals from ListNodes
            n1 = l1_walk.val if l1_walk else 0
            n2 = l2_walk.val if l2_walk else 0

            # add two digits
            sum = n1 + n2 + carry
            dig = sum % 10
            carry = sum // 10

            # create appropriate digit in sum
            curr.next = ListNode(dig)

            # go to next digit
            if l1_walk:
                l1_walk = l1_walk.next
            if l2_walk:
                l2_walk = l2_walk.next
            curr = curr.next

        # add carry if there is a next digit
        if carry == 1:
            curr.next = ListNode(1)

        return dummy_head.next
