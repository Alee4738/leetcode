import { runTests, TestCase } from './testHelpers';

function hasAllCodes(s: string, k: number): boolean {
  // record substrings in a Set, use sliding window
  // And if the size not equal to 2^k, then false
  const seen = new Set<string>();
  const windowSize = k;
  const numPossibleBinaryStrings = Math.pow(2, windowSize);
  for (let start = 0; start < s.length - (windowSize - 1); start++) {
    const binaryNumber = s.substring(start, start + windowSize);
    seen.add(binaryNumber);
    if (seen.size === numPossibleBinaryStrings) {
      return true;
    }
  }
  return false;
}

describe(hasAllCodes.name, () => {
  const testCases: TestCase<[string, number], boolean>[] = [
    new TestCase(['00110110', 2], true),
    new TestCase(['0110', 1], true),
    new TestCase(['0110', 2], false),
    new TestCase(['0000000001011100', 4], false),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = hasAllCodes(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
