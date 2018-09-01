import unittest as ut


def isValidSudoku(board):
    """
    :type board: List[List[str]]
    :rtype: bool
    """
    # Plan: check for invalidity, else it's valid

    # check rows
    for row in range(9):
        nums = set()
        for col in range(9):
            if not board[row][col] == '.':
                if board[row][col] in nums:
                    return False
                nums.add(board[row][col])

    # check cols
    for col in range(9):
        nums = set()
        for row in range(9):
            if not board[row][col] == '.':
                if board[row][col] in nums:
                    return False
                nums.add(board[row][col])

    # check 3x3 squares
    for row_off in [0, 3, 6]:
        for col_off in [0, 3, 6]:
            nums = set()
            for i in range(3):
                row = i + row_off
                for j in range(3):
                    col = j + col_off
                    if not board[row][col] == '.':
                        if board[row][col] in nums:
                            return False
                        nums.add(board[row][col])

    return True


class TestValidSudoku(ut.TestCase):
    def test_empty(self):
        self.assertTrue(isValidSudoku([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))

    def test_one_row(self):
        self.assertTrue(isValidSudoku([
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertTrue(isValidSudoku([
            ['1', '.', '3', '.', '5', '6', '7', '8', '9', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertFalse(isValidSudoku([
            ['1', '2', '3', '1', '5', '6', '7', '8', '9', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))

    def test_one_col(self):
        self.assertTrue(isValidSudoku([
            ['.', '.', '3', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '2', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '1', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '4', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '5', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '6', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '7', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '8', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '9', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertTrue(isValidSudoku([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '2', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '1', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '4', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '6', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '7', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '8', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '9', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertFalse(isValidSudoku([
            ['.', '.', '3', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '2', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '1', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '4', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '3', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '6', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '7', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '8', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '9', '.', '.', '.', '.', '.', '.', ],
        ]))

    def test_one_square(self):
        self.assertTrue(isValidSudoku([
            ['1', '4', '7', '.', '.', '.', '.', '.', '.', ],
            ['2', '5', '8', '.', '.', '.', '.', '.', '.', ],
            ['3', '6', '9', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertTrue(isValidSudoku([
            ['1', '.', '7', '.', '.', '.', '.', '.', '.', ],
            ['2', '.', '8', '.', '.', '.', '.', '.', '.', ],
            ['3', '6', '9', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))
        self.assertFalse(isValidSudoku([
            ['1', '4', '3', '.', '.', '.', '.', '.', '.', ],
            ['2', '5', '8', '.', '.', '.', '.', '.', '.', ],
            ['3', '6', '9', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', ],
        ]))

    def test_lc_true(self):
        self.assertTrue(isValidSudoku([
            ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
            ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
            ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
            ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
            ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
            ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
            ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
            ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
            ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
        ]))

    def test_lc_false(self):
        self.assertFalse(isValidSudoku([
            ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
            ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
            ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
            ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
            ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
            ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
            ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
            ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
            ['.', '.', '.', '.', '8', '.', '.', '7', '9']
        ]))


if __name__ == "__main__":
    ut.main()