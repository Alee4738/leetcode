# 51. N Queens
def solveNQueens(n: int) -> List[List[str]]:
  config, ans = [], []
  blankBoard = [['.' for _ in range(n)] for _ in range(n)]
  
  def canAttack(pos1, pos2):
    r1, c1 = pos1
    r2, c2 = pos2
    return r1 == r2 or c1 == c2 or abs(c2 - c1) == abs(r2 - r1)
  
  def drawBoard():
    ret = [ row.copy() for row in blankBoard ]
    # print(config)
    # print(ret)
    for pos in config:
      ret[pos[0]][pos[1]] = 'Q'
    return [ ''.join(row) for row in ret ]
  
  def backtrack(row):
    if row == n:
      ans.append(drawBoard())
    else:
      for col in range(n):
        next_pos = (row, col)
        allowed = True
        for pos in config:
          if canAttack(pos, next_pos):
            allowed = False
        if allowed:
          config.append(next_pos)
          backtrack(row + 1)
          config.pop()
          
  backtrack(0)
          
  return ans