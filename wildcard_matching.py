"""
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).

The matching should cover the entire input string (not partial).

Note:

    s could be empty and contains only lowercase letters a-z.
    p could be empty and contains only lowercase letters a-z, and characters like ? or *.

Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:

Input:
s = "aa"
p = "*"
Output: true
Explanation: '*' matches any sequence.

Example 3:

Input:
s = "cb"
p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.

Example 4:

Input:
s = "adceb"
p = "*a*b"
Output: true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".

Example 5:

Input:
s = "acdcb"
p = "a*c?b"
Output: false
"""
import unittest


def wildcard_match(s, p):
    """
    :param s: the string to be matched against
    :param p: the pattern (which contains * and ?) to use for matching
    :return:
    """
    # optimization: squeeze consecutive '*' together
    p = list(p)
    last_star = -2
    i = 0
    while i < len(p):
        if p[i] == '*':
            if last_star == i - 1:
                del p[i]
                i = i - 1
            else:
                last_star = i
        i = i + 1

    # key: (s_start, p_start), value: return value of match(s_start, p_start) (see below)
    memo = {}

    def is_match(s_start, p_start):
        """
        :param s_start: index of s to start matching
        :param p_start: index of p to start matching
        :return: bool, starting from s[s_start] and p[p_start], it is a match
        """
        # case: s empty, p empty
        if s_start == len(s) and p_start == len(p):
            return True
        # case: s not empty, p empty (so nothing to match chars in s)
        if s_start != len(s) and p_start == len(p):
            return False
        # dynamic programming part: use memo
        if (s_start, p_start) in memo:
            return memo[(s_start, p_start)]

        # match single characters
        if p[p_start] != '*':
            # case: s empty, p not empty and non-*
            if s_start == len(s):
                memo[(s_start, p_start)] = False
                return False
            # case: s not empty, p not empty and non-*
            else:
                if s[s_start] == p[p_start] or p[p_start] == '?':
                    memo[(s_start, p_start)] = is_match(s_start + 1, p_start + 1)
                    return memo[(s_start, p_start)]
                else:
                    memo[(s_start, p_start)] = False
                    return False

        # match wildcard (*), p[p_start] == '*'
        else:
            # match from 0 chars in s to the rest of s
            for next_s_start in range(s_start, len(s) + 1):
                if is_match(next_s_start, p_start + 1):
                    memo[(s_start, p_start)] = True
                    return True
            memo[(s_start, p_start)] = False
            return False

    return is_match(0, 0)


class TestWildcardMatch(unittest.TestCase):
    def test_blanks(self):
        self.assertTrue(wildcard_match('', ''))
        self.assertTrue(wildcard_match('', '*'))
        self.assertFalse(wildcard_match('', '?'))

    def test_singles(self):
        self.assertTrue(wildcard_match('a', 'a'))
        self.assertTrue(wildcard_match('a', '*'))
        self.assertTrue(wildcard_match('a', '?'))
        self.assertFalse(wildcard_match('a', 'b'))

    def test_letters(self):
        self.assertTrue(wildcard_match('string', 'string'))
        self.assertFalse(wildcard_match('string', 'strung'))

    def test_question_mark(self):
        self.assertTrue(wildcard_match('string', 'stri?g'))
        self.assertTrue(wildcard_match('string', 's?ri?g'))
        self.assertTrue(wildcard_match('string', '??????'))
        self.assertFalse(wildcard_match('string', '???'))

    def test_star(self):
        self.assertTrue(wildcard_match('string', '*'))
        self.assertTrue(wildcard_match('string', 'str*'))
        self.assertTrue(wildcard_match('string', 'st*ng'))
        self.assertTrue(wildcard_match('string', 'stri*ng'))
        self.assertFalse(wildcard_match('string', 'st*ge'))

    def test_question_mark_star(self):
        self.assertTrue(wildcard_match('string', '*?g'))
        self.assertTrue(wildcard_match('string', '?*g'))
        self.assertTrue(wildcard_match('string', '?*?g'))
        self.assertTrue(wildcard_match('string', 'str?*?g'))
        self.assertFalse(wildcard_match('string', '*tr??ng*'))

    def test_leetcode(self):
        self.assertFalse(wildcard_match(
            'bbaaaabababaaabaabbabaabababaaabbaaaababbbbbbbbbaabbaababbaababbabbaabbbabababbababbaaaabaababaabbababbaabbabaaabaabaabaabbabbaaaababaaaabababbbbbabbabbbababbabbabbabbabbbbababaabaaababbaaabaabbbbbaaa',
            'bb*a*bbbb**ab***b**aba*aa**b*a*ab*aa**baaaab***ab*a*****bb*ab*a*ab****a**ab**a*a***bab*b**b*bb***abbabb'
        ))


if __name__ == '__main__':
    unittest.main()