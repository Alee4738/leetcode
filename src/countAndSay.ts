import { TestCase } from './testCase';

function say(numAsString: string): string {
  if (numAsString.length === 0) {
    return '';
  }

  let sayResult: string[] = [];
  let currChar = undefined;
  let currCount = 0;
  for (const char of numAsString) {
    if (currChar === undefined) {
      currChar = char;
      currCount = 1;
    } else if (currChar === char) {
      currCount++;
    } else {
      sayResult.push(`${currCount}${currChar}`);
      currChar = char;
      currCount = 1;
    }
  }
  sayResult.push(`${currCount}${currChar}`);
  const result = sayResult.join('');
  return result;
}

function countAndSay(n: number): string {
  if (n === 1) {
    return '1';
  }
  const prevNum = n - 1;
  return say(countAndSay(prevNum));
}

describe(say.name, () => {
  const testCases: TestCase<string, string>[] = [
    new TestCase('', ''),
    new TestCase('0', '10', 'single digit 0'),
    new TestCase('1', '11', 'single digit 1'),
    new TestCase('11', '21'),
    new TestCase('21', '1211'),
    new TestCase('3333', '43', 'multiple same'),
    new TestCase('13333', '1143', 'multiple same with others'),
    new TestCase('33331133', '432123', 'same digit repeated diff places'),
    new TestCase('11111111111111111', '171', 'repeated > 9 times'),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = say(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});

describe(countAndSay.name, () => {
  const testCases: TestCase<number, string>[] = [
    new TestCase(1, '1', 'base case'),
    new TestCase(2, '11', 'say(countAndSay(1)) = say(1) = 11'),
    new TestCase(3, '21', 'say(countAndSay(2)) = say(11) = 21'),
    new TestCase(4, '1211', 'say(countAndSay(3)) = say(21) = 1211'),
    new TestCase(5, '111221', 'say(countAndSay(4)) = say(1211) = 111221'),
    new TestCase(6, '312211', 'say(countAndSay(5)) = say(111221) = 312211'),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = countAndSay(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
