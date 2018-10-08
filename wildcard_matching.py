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
    :return: bool, s matches p
    """
    # solution copied from https://leetcode.com/problems/wildcard-matching/discuss/138878/Finite-state-machine-with-Python-and-dictionary.-13-lines-O(p%2Bs)-time
    transfer = {}
    state = 0

    for char in p:
        if char == '*':
            transfer[state, char] = state
        else:
            transfer[state, char] = state + 1
            state += 1

    accept = state
    state = set([0])

    for char in s:
        state = set([transfer.get((at, token)) for at in state for token in [char, '*', '?']])

    return accept in state


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