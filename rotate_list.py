# 61. Rotate list: 21:00, missed [] case
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

def rotateRight(head: ListNode, k: int) -> ListNode:
  # find length and make circular
  length = 0
  curr = head
  while curr != None:
    length += 1
    if curr.next == None:
      curr.next = head
      curr = None
    else:
      curr = curr.next
      
  if length == 0:
    return head
  
  # break list at the correct point
  num_jumps = length - (k % length) - 1
  curr = head
  for i in range(num_jumps):
    curr = curr.next
  head = curr.next
  curr.next = None
  return head