import palindromes as pd

def main():
  path = 'in.txt'
  
  # open file
  with open(path, 'r') as f:
    read_data = f.readlines()
    
  # TODO: fix for multiple arguments
  for line in read_data:
    run_algo(pd.find_all_palindromes, line)


def run_algo(algo, *args):
  print('Input: ', end='')
  print(args)

  output = algo(args)

  print('Output: ', end='')
  print(output)
  print()


def my_algo(p1):
  return p1


if __name__ == "__main__":
  main()
