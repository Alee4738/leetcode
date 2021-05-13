import { TestCase, runTests } from './testHelpers';

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  function canFinishCourse(
    courseNum: number,
    prerequisiteAdjList: Array<Set<number>>,
    path: Set<number>,
    cache: boolean[]
  ): boolean {
    if (cache[courseNum] === true) {
      return true;
    }

    const prereqs: Set<number> = prerequisiteAdjList[courseNum];
    if (prereqs.size === 0) {
      cache[courseNum] = true;
      return true;
    }

    if (path.has(courseNum)) {
      cache[courseNum] = false;
      return false;
    }

    path.add(courseNum);
    let result = true;
    for (const prereq of prereqs) {
      if (!canFinishCourse(prereq, prerequisiteAdjList, path, cache)) {
        result = false;
        break;
      }
    }
    path.delete(courseNum);
    cache[courseNum] = result;
    return result;
  }

  // this is basically finding a cycle in a directed graph
  // So how do I do that?

  // Generate the graph
  // The graph can be represented as an array of arrays
  // Basically prequisites but defined using adjacency lists rather than edges
  const prerequisiteAdjList: Array<Set<number>> = [];
  for (let i = 0; i < numCourses; i++) {
    prerequisiteAdjList.push(new Set<number>());
  }

  for (const [course, prereq] of prerequisites) {
    prerequisiteAdjList[course].add(prereq);
  }

  const cache: boolean[] = [];
  const path = new Set<number>();
  for (let i = 0; i < numCourses; i++) {
    if (!canFinishCourse(i, prerequisiteAdjList, path, cache)) {
      return false;
    }
  }
  return true;
}

describe(canFinish.name, () => {
  const testCases: TestCase<[number, number[][]], boolean>[] = [
    new TestCase([2, [[1, 0]]], true),
    new TestCase(
      [
        2,
        [
          [1, 0],
          [0, 1],
        ],
      ],
      false
    ),
    new TestCase(
      [
        4,
        [
          [3, 1],
          [3, 2],
          [1, 0],
          [2, 0],
        ],
      ],
      true
    ),
    new TestCase(
      [
        7,
        [
          [6, 4],
          [4, 5],
          [4, 3],
          [3, 2],
          [2, 1],
          [2, 4],
          [1, 0],
        ],
      ],
      false
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = canFinish(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
