"""
You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

Example 1:

Input:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoor" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.

Example 2:

Input:
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
Output: []
"""

import unittest
from typing import List

def findSubstring(s: str, words: List[str]) -> List[int]:
	if not s or not words:
		return []

	# maintain word list as frequency dictionary
	wordsFreq = {}
	for word in words:
		wordsFreq[word] = wordsFreq.setdefault(word, 0) + 1

	numWords = len(words)
	wordSize = len(words[0])
	result = []

	for start in range(wordSize):
		# starting with index start, split entire string into a word list,
		# which has words of size wordSize
		wordList = []
		for i in range(start, len(s), wordSize):
			if i+wordSize <= len(s):
				wordList.append((s[i:(i+wordSize)], i))

		print(wordList)

		
		# consider each numWords-length sublist of the word list
		# for i in range(len(wordList) - numWords + 1):
		# 	currWords = {}
		# 	for word, index in wordList[i:(i+numWords)]:
		# 		currWords[word] = currWords.setdefault(word, 0) + 1

		# 	if currWords == wordsFreq:
		# 		result.append(wordList[i][1])
		currWords = {}
		windowSize = 0
		print("num words: " + str(numWords) + " , wordSize: " + str(wordSize))
		for word, index in wordList:
			if windowSize < numWords:
				currWords[word] = currWords.setdefault(word, 0) + 1
				windowSize += 1
			else:
				# remove leftmost word of current words
				wordToRemove = s[index - (numWords * wordSize):index - (numWords * wordSize) + wordSize]
				print("word to remove: " + wordToRemove)
				print(currWords)
				currWords[wordToRemove] = currWords.setdefault(wordToRemove, 0) - 1
				if currWords[wordToRemove] == 0:
					del currWords[wordToRemove]
				print(currWords)

				# add word
				currWords[word] = currWords.setdefault(word, 0) + 1
				print(currWords)

			if windowSize == numWords and currWords == wordsFreq:
				result.append(index - (numWords * wordSize) + wordSize)

	print()
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

	def test_leetcode_3(self):
		self.assertCountEqual(
			findSubstring("lingmindraboofooowingdingbarrwingmonkeypoundcake",
				["fooo","barr","wing","ding","wing"]),
			[13])

	def test_duplicates(self):
		self.assertCountEqual(
			findSubstring('wordgoodbestwordwordhelloworld', ['word','good','best','word']),
			[0, 4])

	def test_start_shifted(self):
		self.assertCountEqual(
			findSubstring('abbcab', ['ab', 'bc']),
			[0, 2])

		self.assertCountEqual(
			findSubstring('gabbcab', ['ab', 'bc']),
			[1, 3])
		

if __name__ == '__main__':
	unittest.main()