def longest_palindrome(s):
    """
    s a string, max length 1000
    returns longest palindrome in s
    """
    if s == '' or len(s) == 1:
        return s

    max_palin_length = 1
    max_palin_left, max_palin_right = 0, 0

    for i in range(len(s)):
        odd_length, even_length = 0, 0

        odd_palin = longest_palindrome_at(s, i, i)
        odd_length = odd_palin[1] - odd_palin[0] + 1
        if (i + 1) < len(s) and s[i] == s[i + 1]:
            even_palin = longest_palindrome_at(s, i, i + 1)
            even_length = even_palin[1] - even_palin[0] + 1

        if odd_length > max_palin_length:
            max_palin_left, max_palin_right, max_palin_length = odd_palin[0], odd_palin[1], odd_length
        if even_length > max_palin_length:
            max_palin_left, max_palin_right, max_palin_length = even_palin[0], even_palin[1], even_length

    return s[max_palin_left : max_palin_right + 1]


def longest_palindrome_at(s, left_ctr_idx, right_ctr_idx):
    """
    :param s: str
    :param left_ctr_idx: int [0,len(s))
    :param right_ctr_idx: int [0, len(s))
    :return: 2-tuple (l, r) where s[l:r+1] is the longest palindrome at center
    It is invalid to call when s[left_ctr_idx : right_ctr_idx + 1] is not a palindrome
        (i.e. usage is designed to expand 1-length and 2-length palindromes)
    """
    left_edge, right_edge = left_ctr_idx, right_ctr_idx
    while 0 <= left_edge - 1 < len(s) and 0 <= right_edge + 1 < len(s) and \
            s[left_edge - 1] == s[right_edge + 1]:
        left_edge = left_edge - 1
        right_edge = right_edge + 1

    return left_edge, right_edge

str_list = [
    'babad', 'abba', 'abcd', 'abbabbac', 'cabbabba', 'asdfabbabbac',
    'bbbbbbbbbbbbbbbbbbbb'
]

for st in str_list:
    print('Input: %s' % st)
    print('Output: %s\n' % longest_palindrome(st))
