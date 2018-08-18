"""
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
"""
def generateParenthesis(n):
    """
    :type n: int
    :rtype: List[str]
    """
    l = []

    def helper(s, num_open, num_closed):
        # always: num_open <= num_closed
        if num_open == 0 and num_closed == 0:
            l.append(s)
        elif num_open == num_closed:  # only open
            helper(s + '(', num_open - 1, num_closed)
        elif num_open == 0:  # only close
            helper(s + ')', num_open, num_closed - 1)
        else:
            helper(s + '(', num_open - 1, num_closed)
            helper(s + ')', num_open, num_closed - 1)

    helper('', n, n)
    return l


print(generateParenthesis(3))
