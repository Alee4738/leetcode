"""
Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.
"""

def intToRoman(num):
    ones = num % 10
    tens = int(num / 10) % 10
    hundreds = int(num / 100) % 10
    thousands = int(num / 1000)

    return ('M' * thousands) + convert_single_num(hundreds, 'C', 'D', 'M') + convert_single_num(tens, 'X', 'L', 'C') + convert_single_num(ones, 'I', 'V', 'X')


def convert_single_num(val: int, one_symbol: str, five_symbol: str, ten_symbol: str) -> str:
    """
    :param val: int [0, 9]
    :param one_symbol: string representing one
    :param five_symbol: string representing five
    :param ten_symbol: string representing ten
    :return: str roman numeral representation of val using one_symbol, five_symbol, and ten_symbol
    """
    if val == 9:
        return one_symbol + ten_symbol
    elif val == 4:
        return one_symbol + five_symbol
    else:
        ret = ''
        if int(val / 5) >= 1:
            ret = five_symbol
            val = val - 5
        ret = ret + (one_symbol * (val % 5))
        return ret
