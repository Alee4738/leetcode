# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

def swapPairs(head):
    """
    :type head: ListNode
    :rtype: ListNode
    """
    if head is None or head.next is None:
        return head

    dummy_head = prev_node = ListNode(0)  # dummy node
    prev_node.next = head

    odd_node = head
    even_node = head.next

    while odd_node is not None and even_node is not None:
        # swap adjacent nodes
        odd_node.next = even_node.next
        even_node.next = odd_node

        prev_node.next = even_node

        # update pointers
        prev_node = odd_node
        odd_node = odd_node.next
        if odd_node is not None:
            even_node = odd_node.next

    head = dummy_head.next

    return head
