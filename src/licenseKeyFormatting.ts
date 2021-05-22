import { runTests, TestCase } from './testHelpers';

function licenseKeyFormatting(S: string, K: number): string {
  const result = [];
  let currGroup = [];
  for (let i = S.length - 1; i >= 0; i--) {
    const char = S[i].toUpperCase();
    if (char === '-') {
      continue;
    }
    currGroup.push(char);
    if (currGroup.length === K) {
      currGroup.reverse();
      const groupAsString = currGroup.join('');
      result.push(groupAsString);
      currGroup = [];
    }
  }

  if (currGroup.length > 0) {
    currGroup.reverse();
    const groupAsString = currGroup.join('');
    result.push(groupAsString);
  }
  result.reverse();
  return result.join('-');
}

describe(licenseKeyFormatting.name, () => {
  const testCases: TestCase<[string, number], string>[] = [
    new TestCase(['5F3Z-2e-9-w', 4], '5F3Z-2E9W'),
    new TestCase(['2-5g-3-J', 2], '2-5G-3J'),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = licenseKeyFormatting(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
