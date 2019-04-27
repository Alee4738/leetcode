import unittest
from typing import List

def findSubstring(s: str, words: List[str]) -> List[int]:
	# maintain word list as frequency dictionary
	wordsFreq = {}
	for word in words:
		wordsFreq[word] = wordsFreq.setdefault(word, 0) + 1

	numWords = len(words)
	wordSize = len(words[0])
	result = []

	# don't worry about string immutability
	for start, char in enumerate(s):
		currWords = {}
		
		if start + numWords * wordSize <= len(s):
			for j in range(start, start + numWords * wordSize, wordSize):
				word = s[j:(j + wordSize)]
				currWords[word] = currWords.setdefault(word, 0) + 1

			if currWords == wordsFreq:
				result.append(start)

	return result


class TestFindSubstring(unittest.TestCase):
	def test_leetcode_1(self):
		self.assertCountEqual(
			findSubstring('barfoothefoobarman', ['foo','bar']),
			[0, 9])

	def test_leetcode_2(self):
		self.assertCountEqual(
			findSubstring('wordgoodgoodgoodbestword', ['word','good','best','word']),
			[])

	def test_duplicates(self):
		self.assertCountEqual(
			findSubstring('wordgoodbestwordwordhelloworld', ['word','good','best','word']),
			[0, 4])

if __name__ == '__main__':
	unittest.main()