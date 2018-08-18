# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


def removeNthFromEnd(head, n):
    """
    :type head: ListNode
    :type n: int
    :rtype: ListNode
    """
    removed_yet, list_length = rm_yet(head, n)
    if removed_yet:
        return head
    elif n == list_length:  # remove head
        return head.next
    else:
        print(n)
        print('Invalid n. This should never happen')
        return None


def rm_yet(head, n):
    if not head:
        return False, 0
    elif not head.next:
        return False, 1
    else:
        removed_yet, tail_length = rm_yet(head.next, n)

        if not removed_yet and tail_length == n:    # remove head.next
            head.next = head.next.next
            return True, tail_length
        else:
            return removed_yet, 1 + tail_length


def print_list(head):
    i = head
    while i is not None:
        print('%s -> ' % str(i.val), end='')
        i = i.next
    print()



# head = ListNode(-2)
# curr = ListNode(-1)
# head.next = curr
# for i in range(10):
#     curr.next = ListNode(i)
#     curr = curr.next
#
# print_list(head)
# head = removeNthFromEnd(head, 11)
# print_list(head)


lc_1 = curr = ListNode(1)
for i in range(2, 6):
    curr.next = ListNode(i)
    curr = curr.next
print_list(lc_1)
lc_1 = removeNthFromEnd(lc_1, 2)
print_list(lc_1)
