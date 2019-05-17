# 79. Word Search - 32:00, off by 1 base case
def exist(board: List[List[str]], word: str) -> bool:
  if len(board) <= 0 or len(board[0]) <= 0:
    return False
  rows, cols = len(board), len(board[0])
  
  def search(i, path):
    # print(i)
    # print(path)
    if i >= len(word):
      # print('Base case')
      return True
    r, c = path[-1]
    for r2, c2 in [(r-1,c), (r+1,c), (r,c-1), (r,c+1)]:
      if 0 <= r2 and r2 < rows and \
        0 <= c2 and c2 < cols and \
        (r2, c2) not in path and \
        board[r2][c2] == word[i]:
          path.append((r2, c2))
          if search(i+1, path):
            return True
          path.pop()
    return False
  
  for r in range(rows):
    for c in range(cols):
      if word[0] == board[r][c]:
        if search(1, [(r, c)]):
          return True
  return False