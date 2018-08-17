def letterCombinations(digits):
    """
    :type digits: str
    :rtype: List[str]
    """
    num_to_letters = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }

    def next_word(digits):
        if len(digits) == 0:
            yield ''
        elif len(digits) == 1:
            for letter in num_to_letters[digits[0]]:
                yield letter
        else:
            for letter in num_to_letters[digits[0]]:
                for tail in next_word(digits[1:]):
                    yield letter + tail

    # depth first search using generators
    if digits == '':
        return []

    return list(next_word(digits))


print(letterCombinations('23'))