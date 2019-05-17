# 10. Regular Expression matching (slow, generic backtrack)

def backtrack(start_state, next_states, accept):
  path = [start_state]
  while path:
    state = path.pop()
    if accept(state):
      return True
    else:
      for s in next_states(state):
        path.append(s)
  return False
def isMatch(s: str, p: str) -> bool:
  def next_states(indices):
    s_i, p_i = indices
    if p_i == len(p):
      return []
    elif p_i + 1 < len(p) and p[p_i + 1] == '*':
      # '*', can either stay (match a single char, come back to p_i)
      # or move on (match none, go up 2 chars, accounting for '*')
      if s_i == len(s):
        # move on (match 0)
        return [(s_i, p_i + 2)]
      else:
        if p[p_i] == '.' or p[p_i] == s[s_i]:
          # char match, can stay (match 1) or move on (match 0)
          return [(s_i + 1, p_i), (s_i, p_i + 2)]
        else:
          # char not match, can only move on (match 0)
          return [(s_i, p_i + 2)]
    elif s_i == len(s):
      # single char, but s ended already, so impossible to match
      return []
    elif p[p_i] == '.' or p[p_i] == s[s_i]:
      # single char match, match 1
      return [(s_i + 1, p_i + 1)]
    else:
      # single char, no match
      return []
    
  return backtrack((0,0), next_states, lambda state: state[0] == len(s) and state[1] == len(p))