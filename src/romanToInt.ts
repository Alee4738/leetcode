import { TestCase } from './testHelpers';

function romanToInt(s: string): number {
  const valueBySymbol: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let total = 0;
  let i = 0;
  while (i < s.length) {
    const symbol = s[i];
    const val = valueBySymbol[symbol];
    const nextSymbol: string | undefined = s[i + 1];
    if (
      (symbol === 'I' && ['V', 'X'].includes(nextSymbol)) ||
      (symbol === 'X' && ['L', 'C'].includes(nextSymbol)) ||
      (symbol === 'C' && ['D', 'M'].includes(nextSymbol))
    ) {
      const nextVal = valueBySymbol[nextSymbol];
      total += nextVal - val;
      i++;
    } else {
      total += val;
    }
    i++;
  }
  return total;
}

describe(romanToInt.name, () => {
  const testCases: TestCase<string, number>[] = [
    new TestCase('III', 3),
    new TestCase('IV', 4),
    new TestCase('IX', 9),
    new TestCase('LVIII', 58),
    new TestCase('MCMXCIV', 1994),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = romanToInt(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
