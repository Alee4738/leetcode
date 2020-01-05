"""
Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Note:
    s could be empty and contains only lowercase letters a-z.
    p could be empty and contains only lowercase letters a-z, and characters like . or *.

Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:

Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
"""


def match_regex(s, p):
    """
    :type s: str
    :type p: str
    :rtype: bool
    """
    memo = {}
    return is_match(s, p, 0, 0, memo)


def is_match(s, p, s_start, p_start, memo):
    """
    :type s: List[str]
    :type p: List[str]
    :type s_start: int, the index of s to start looking from
    :type p_start: int, the index of p to start looking from
    :rtype: bool
    """
    # base cases
    # it was memoized already
    if (s_start, p_start) in memo:
        return memo[(s_start, p_start)]

    # s and p both empty
    elif s_start == len(s) and p_start == len(p):
        memo[(s_start, p_start)] = True
        return memo[(s_start, p_start)]

    # s not empty and p empty (so nothing matches s's next chars)
    elif s_start != len(s) and p_start == len(p):
        memo[(s_start, p_start)] = False
        return memo[(s_start, p_start)]

    # s empty and p not empty
    elif s_start == len(s) and p_start != len(p):
        # only possible way to match is that next number of chars is even
        # and that next even chars are all * (which will match 0)
        if (len(p) - p_start) % 2 == 0:
            for i in range(p_start + 1, len(p), 2):
                if p[i] != '*':
                    memo[(s_start, p_start)] = False
                    return memo[(s_start, p_start)]
            memo[(s_start, p_start)] = True
            return memo[(s_start, p_start)]
        else:
            memo[(s_start, p_start)] = False
            return memo[(s_start, p_start)]

    else:
        # Now, s not empty and p not empty.

        # match cases:
        # p exactly 1 char
        # p's second char is not *
        if p_start + 1 == len(p) or p[p_start + 1] != '*':
            # match one-to-one
            if s[s_start] == p[p_start] or p[p_start] == '.':
                memo[(s_start, p_start)] = is_match(s, p, s_start + 1, p_start + 1, memo)
                return memo[(s_start, p_start)]
            else:
                memo[(s_start, p_start)] = False
                return memo[(s_start, p_start)]

        # p's second char is *
        # Use * to match from 0 to max_matches, the max number of chars that can match p's first char
        max_matches = 0
        while s_start + max_matches < len(s) and (p[p_start] == s[s_start + max_matches] or p[p_start] == '.'):
            max_matches = max_matches + 1

        # try all possible number of matches
        for num_matched in range(0, max_matches + 1):
            ans = is_match(s, p, s_start + num_matched, p_start + 2, memo)
            if ans:
                memo[(s_start, p_start)] = True
                return memo[(s_start, p_start)]
        memo[(s_start, p_start)] = False
        return memo[(s_start, p_start)]


assert(not match_regex('aa', 'a'))
assert(match_regex('aa', 'a*'))
assert(match_regex('ab', '.*'))
assert(match_regex('aab', 'c*a*b'))
assert(not match_regex('mississippi', 'mis*is*p*.'))
assert(match_regex('a', 'ab*'))
assert(match_regex('bbbba', '.*a*a'))


