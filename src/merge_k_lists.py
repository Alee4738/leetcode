# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        lists_by_first_val = {}
        min_heap = []
        for (i, l) in enumerate(lists):
            if l is None:
                continue
            first_val = l.val
            heapq.heappush(min_heap, first_val)

            existing_list = lists_by_first_val.setdefault(first_val, [])
            existing_list.append(l)
            lists_by_first_val[first_val] = existing_list

        # exhaust the heap
        result_with_dummy_head = ListNode(0)
        curr_tail = result_with_dummy_head
        while len(min_heap) > 0:
            min_val = heapq.heappop(min_heap)
            lists_with_min_as_first_val = lists_by_first_val.get(min_val)
            l = lists_with_min_as_first_val.pop()
            curr_tail.next = l  # it's fine clobbering l because you won't use it anymore. you'll only use l.next
            curr_tail = curr_tail.next

            l_without_first = l.next
            if l_without_first is not None:
                # re-insert it into the heap and the dict
                heapq.heappush(min_heap, l_without_first.val)
                existing_list = lists_by_first_val.setdefault(l_without_first.val, [])
                existing_list.append(l_without_first)
                lists_by_first_val[l_without_first.val] = existing_list


        return result_with_dummy_head.next
