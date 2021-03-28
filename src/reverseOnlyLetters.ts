import { TestCase } from './testHelpers';

function reverseOnlyLetters(S: string): string {
  const letters = new Set<string>([
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ]);
  const result = new Array(...S).filter((char) => letters.has(char));
  result.reverse();
  for (let i = 0; i < S.length; i++) {
    const char = S[i];
    if (!letters.has(char)) {
      result.splice(i, 0, char);
    }
  }
  return result.join('');
}

describe(reverseOnlyLetters.name, () => {
  const testCases: TestCase<string, string>[] = [
    new TestCase('ab-cd', 'dc-ba'),
    new TestCase('a-bC-dEf-ghIj', 'j-Ih-gfE-dCba'),
    new TestCase('Test1ng-Leet=code-Q!', 'Qedo1ct-eeLg=ntse-T!'),
    new TestCase('--', '--'),
    new TestCase('---', '---'),
    new TestCase('', ''),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = reverseOnlyLetters(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
