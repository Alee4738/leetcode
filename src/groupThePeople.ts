import { runTests, TestCase } from './testHelpers';

function groupThePeople(groupSizes: number[]): number[][] {
  // if person i and j are in the same group, then groupSizes[i] === groupSizes[j]
  // if GS[i] === GS[j], then i and j are not necessarily in the same group, but you can think of them both as in the set of groups that are size GS[i]
  // Since I know there exists at least 1 valid solution,
  // the number of times I will see GS[i] is k * GS[i] where k > 0 integer
  // have an object
  // { 1: [[5], [2], [10]], 2: [[]]}

  const groupsBySize = new Map<number, number[][]>();
  for (let i = 0; i < groupSizes.length; i++) {
    const size = groupSizes[i];
    // console.log('i', i, 'size', size)
    const groupsOfSameSize: number[][] = groupsBySize.get(size) ?? [[]];
    const lastGroup = groupsOfSameSize[groupsOfSameSize.length - 1];
    if (lastGroup.length < size) {
      lastGroup.push(i);
    } else {
      groupsOfSameSize.push([i]);
    }
    groupsBySize.set(size, groupsOfSameSize);
    // console.log('groupsBySize', groupsBySize)
  }

  let result: number[][] = [];
  for (const [size, groupsOfSameSize] of groupsBySize) {
    result = result.concat(groupsOfSameSize);
  }
  return result;
}

describe(groupThePeople.name, () => {
  const testCases: TestCase<number[], number[][]>[] = [
    new TestCase([3, 3, 3, 3, 3, 1, 3], [[0, 1, 2], [3, 4, 6], [5]]),
    new TestCase([2, 1, 3, 3, 3, 2], [[0, 5], [1], [2, 3, 4]]),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = groupThePeople(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
