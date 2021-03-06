"""
Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]

Note:

    All inputs will be in lowercase.
    The order of your output does not matter.

"""

def groupAnagrams(strs):
    """
    :type strs: List[str]
    :rtype: List[List[str]]
    """
    anagrams = {}
    for s in strs:
        # key is a dictionary of character:freq
        # anagrams will have the same key
        key = {}
        for c in s:
            freq = key.get(c)
            if freq:
                key[c] = freq + 1
            else:
                key[c] = 1
        # make key hashable
        key = frozenset(key.items())

        anagram_list = anagrams.get(key)
        if anagram_list:
            anagram_list.append(s)
        else:
            anagrams[key] = [s]
    
    return list(anagrams.values())
