class Solution:
    def findMedianSortedArrays(self, nums1: 'List[int]', nums2: 'List[int]') -> 'float':
        """
        TODO: Approach 2
        Idea: recursive half cuts
        O() time, O(?) space
        """


        """
        Approach 1
        Idea: Virtually merge the first half of lists like mergesort
        O(m+n) time, O(?) space
        """
        s1, s2 = len(nums1),  len(nums2)
        size = s1 + s2
        
        # start off at the beginning of each list
        i1, i2 = 0, 0
        med = (1, 0)
        
        for i in range(0, (size + 1) // 2):
            # list 1 list is empty
            if i1 >= s1:
                med = (2, i2)
                i2 = i2 + 1
            # list 2 is empty
            elif i2 >= s2:
                med = (1, i1)
                i1 = i1 + 1
            # find lowest number
            elif nums1[i1] < nums2[i2]:
                med = (1, i1)
                i1 = i1 + 1
            else:
                med = (2, i2)
                i2 = i2 + 1
        
        if size % 2 == 1:
            if med[0] == 1:
                return nums1[med[1]]
            else:
                return nums2[med[1]]
        else:
            tmp = med
            # iterate once more
            # list 1 list is empty
            if i1 >= s1:
                med = (2, i2)
                i2 = i2 + 1
            # list 2 is empty
            elif i2 >= s2:
                med = (1, i1)
                i1 = i1 + 1
            # find lowest number
            elif nums1[i1] < nums2[i2]:
                med = (1, i1)
                i1 = i1 + 1
            else:
                med = (2, i2)
                i2 = i2 + 1
                
            # average
            if tmp[0] == 1:
                lower_med = nums1[tmp[1]]
            else:
                lower_med = nums2[tmp[1]]
            
            if med[0] == 1:
                upper_med = nums1[med[1]]
            else:
                upper_med = nums2[med[1]]
            
            return (lower_med + upper_med) / 2
        