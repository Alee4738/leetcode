// 91. Decode Ways
/*
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

    "AAJF" with the grouping (1 1 10 6)
    "KJF" with the grouping (11 10 6)

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Constraints:

    1 <= s.length <= 100
    s contains only digits and may contain leading zero(s).

*/
import { runTests, TestCase } from './testHelpers';

// With cache, this is O(n) time
function numDecodingsHelper(s: string, cache: Map<string, number>): number {
  const cachedResult = cache.get(s);
  if (cachedResult !== undefined) {
    return cachedResult;
  } else if (s.length === 0) {
    return 1;
  }

  const firstDigit = +s[0];
  if (firstDigit === 0) {
    return 0;
  }

  // Recursive case
  // js strings are immutable, so slice is O(n)
  const numDecodingsWithFirstDigitSeparate = numDecodingsHelper(
    s.slice(1),
    cache
  );
  let totalNumDecodings = numDecodingsWithFirstDigitSeparate;

  const secondDigit = +s[1];
  const firstAndSecondDigit = firstDigit * 10 + secondDigit;
  const isFirstAndSecondDigitAValidNumber =
    1 <= firstAndSecondDigit && firstAndSecondDigit <= 26;
  if (isFirstAndSecondDigitAValidNumber) {
    const numDecodingsWithFirstAndSecondDigitTogether = numDecodingsHelper(
      s.slice(2),
      cache
    );
    totalNumDecodings += numDecodingsWithFirstAndSecondDigitTogether;
  }
  cache.set(s, totalNumDecodings);
  return totalNumDecodings;
}

function numDecodings(s: string): number {
  return numDecodingsHelper(s, new Map<string, number>());
}

describe(numDecodings.name, () => {
  const testCases: TestCase<string, number>[] = [
    new TestCase('0', 0),
    new TestCase('1', 1),
    new TestCase('12', 2),
    new TestCase('226', 3),
    new TestCase('06', 0),
    new TestCase('11106', 2),
    new TestCase('1003', 0, 'double 0 fails'),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = numDecodings(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
