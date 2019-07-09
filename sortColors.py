def sortColors(nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # The naive counting solution
    n = len(nums)
    freq = [0, 0, 0]
    for num in nums:
        freq[num] += 1

    curr = num = 0
    while num <= 2 and curr < n:
        i = 0
        while i < freq[num]:
            nums[curr] = num
            curr += 1
            i += 1
        num += 1
    
    