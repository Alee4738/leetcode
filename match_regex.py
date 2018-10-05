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
    return is_match(s, p, 0, 0)


def is_match(s, p, s_start, p_start):
    """
    :type s: List[str]
    :type p: List[str]
    :type s_start: int, the index of s to start looking from
    :type p_start: int, the index of p to start looking from
    :rtype: bool
    """
    # base cases
    # s and p both empty
    if s_start == len(s) and p_start == len(p):
        return True

    # s not empty and p empty (so nothing matches s's next chars)
    elif s_start != len(s) and p_start == len(p):
        return False

    # s empty and p not empty
    elif s_start == len(s) and p_start != len(p):
        # only possible way to match is that next number of chars is even
        # and that next even chars are all * (which will match 0)
        if (len(p) - p_start) % 2 == 0:
            for i in range(p_start + 1, len(p), 2):
                if p[i] != '*':
                    return False
            return True
        else:
            return False

    else:
        # Now, s not empty and p not empty.

        # match cases:
        # p exactly 1 char
        # p's second char is not *
        if p_start + 1 == len(p) or p[p_start + 1] != '*':
            # match one-to-one
            if s[s_start] == p[p_start] or p[p_start] == '.':
                return is_match(s, p, s_start + 1, p_start + 1)
            else:
                return False

        # p's second char is *
        # Use * to match from 0 to max_matches, the max number of chars that can match p's first char
        max_matches = 0
        while s_start + max_matches < len(s) and (p[p_start] == s[s_start + max_matches] or p[p_start] == '.'):
            max_matches = max_matches + 1

        # try all possible number of matches
        for num_matched in range(0, max_matches + 1):
            if is_match(s, p, s_start + num_matched, p_start + 2):
                return True
        return False


# assert(not match_regex('aa', 'a'))
# assert(match_regex('aa', 'a*'))
# assert(match_regex('ab', '.*'))
# assert(match_regex('aab', 'c*a*b'))
# assert(not match_regex('mississippi', 'mis*is*p*.'))
# assert(match_regex('a', 'ab*'))
assert(match_regex('bbbba', '.*a*a'))


