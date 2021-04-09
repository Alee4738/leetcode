import { TestCase } from './testHelpers';

function videoStitching(clips: number[][], T: number): number {
  // Greedy solution: Given a minute that you need to cover, choose the interval that covers it and goes the farthest
  // given any minute i, clipsByMinute[i] is the set of clips that contain i
  const clipsByMinute = new Array(T + 1);
  for (let i = 0; i < T + 1; i++) {
    clipsByMinute[i] = [];
  }
  for (const clip of clips) {
    // console.log('add clip', clip)
    for (let i = clip[0]; i <= clip[1] && i <= T; i++) {
      clipsByMinute[i].push(clip);
    }
  }
  // console.log(clipsByMinute)

  let optimalNumClips = 0;
  let currMinute = 0;
  while (true) {
    if (currMinute >= T) {
      break;
    }
    // choose interval that covers curr and goes the farthest
    const clipsThatContainMinute = clipsByMinute[currMinute];
    if (clipsThatContainMinute.length === 0) {
      return -1;
    }
    let farthestMinuteSeen = currMinute - 1;
    for (const clip of clipsThatContainMinute) {
      if (clip[1] > farthestMinuteSeen) {
        farthestMinuteSeen = clip[1];
      }
    }
    if (farthestMinuteSeen === currMinute && farthestMinuteSeen < T) {
      return -1;
    }
    currMinute = farthestMinuteSeen;
    optimalNumClips++;
  }
  return optimalNumClips;
}

describe(videoStitching.name, () => {
  const testCases: TestCase<[number[][], number], number>[] = [
    new TestCase(
      [
        [
          [0, 2],
          [4, 6],
          [8, 10],
          [1, 9],
          [1, 5],
          [5, 9],
        ],
        10,
      ],
      3
    ),
    new TestCase(
      [
        [
          [0, 1],
          [1, 2],
        ],
        5,
      ],
      -1
    ),
    new TestCase(
      [
        [
          [0, 1],
          [6, 8],
          [0, 2],
          [5, 6],
          [0, 4],
          [0, 3],
          [6, 7],
          [1, 3],
          [4, 7],
          [1, 4],
          [2, 5],
          [2, 6],
          [3, 4],
          [4, 5],
          [5, 7],
          [6, 9],
        ],
        9,
      ],
      3
    ),
    new TestCase(
      [
        [
          [0, 4],
          [2, 8],
        ],
        5,
      ],
      2
    ),
    new TestCase(
      [
        [
          [0, 5],
          [6, 8],
        ],
        7,
      ],
      -1
    ),
  ];

  testCases.forEach((testCase) => {
    it(testCase.desc ?? 'None', () => {
      const actualResult = videoStitching(...testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    });
  });
});
