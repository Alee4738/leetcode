// Inspired by 3Blue1Brown complex number puzzle:
// Find the number of subsets of {1, ..., 2000}, the sum of whose elements is divisible by 5.
// https://www.youtube.com/watch?v=bOXCLR3Wric

import { runTests, TestCase } from './testHelpers';

// Observation 1: Since I'm only concerned with divisibility, 1 is the same as 6, 2 as 7, 3 as 8, etc.
// so instead of considering [1,2,...2000], I can say I have a dictionary<remainder, frequency>
// { 0: 400, 1: 400, ... 4: 400 } and I choose numbers from that to get my subset.

// Could this be solved using dynamic programming?
// Sol(n) = func(Sol(n-1, ...), Sol(n-2, ...))

// Imagine I'm going from [1..4] to [1..5]. The next number is 5
// any subset x of subsets of size 0 from [1..4] can become x + [5], becoming size 1
// any subset x of subsets of size 1 from [1..4] can become x + [5], becoming size 2
// any subset x of subsets of size 2 from [1..4] can become x + [5], becoming size 3
// any subset x of subsets of size 3 from [1..4] can become x + [5], becoming size 4
// any subset x of subsets of size 4 from [1..4] can become x + [5], becoming size 5
// So, the number of subsets div by 5 at least doubles.
// Actually, it's 2x + 1 because with the inclusion of 5, no subset whose remainder != 0
// can become one with remainder = 0.

// What if the next number is not remainder 0?
// Generally, we'll have to keep track of the number of subsets whose sum is remainder 0,1,2,3,4

// Think about the number of subsets of [1,2,...n]
// It's 2^n because you can choose 1 to be in or out (2 choices), then choose 2 in or out,
// and 3, 4, etc. = 2*2*2...*2 = 2^n
// So as we're increasing n by 1, the number of subsets doubles. That's a good way to make sure
// we're counting every subset there is.
// Only the remainder matters.

function numSubsetsDivByX(n: number, mod: number): BigInt {
  // Idea: Build up from [] to [1] to [1,2] to [1,2,...2000]
  // Keep track of the number of subsets whose sum has remainder 0,1,2,3...mod.
  // remCount[i] is the number of subsets whose sum has remainder i.
  // At first, the empty set has remainder 0, so remCount = [1, 0, 0, 0, ... 0]
  let remCount = new Array<bigint>(mod);
  remCount.fill(BigInt(0));
  remCount[0] = BigInt(1);
  for (let choice = 1; choice <= n; choice++) {
    const nextRemCount = Array.from(remCount);
    for (let rem = 0; rem < nextRemCount.length; rem++) {
      // Looking at the subsets whose remainder is rem, if we decide to include choice,
      // then it'll have a new remainder remWithChoice. These new subsets are different
      // from anything we've ever counted because they include the new choice, so they
      // can be directly added to the appropriate bucket of remCount.
      const remWithChoice = (rem + choice) % mod;
      nextRemCount[remWithChoice] = nextRemCount[remWithChoice] + remCount[rem];
    }
    remCount = nextRemCount;
  }

  return remCount[0];
}

fdescribe(numSubsetsDivByX.name, () => {
  const testCases: TestCase<[number, number], BigInt>[] = [
    new TestCase([3, 5], BigInt(2)), // [1,2,3] -> [], [2,3]
    new TestCase([5, 5], BigInt(8)), // [1,2,3,4,5] -> [], [5], [1,4], [2,3], [1,4,5], [2,3,5], [1,2,3,4], [1,2,3,4,5]
    // My solution is too time-inefficient for the 3b1b case.
    new TestCase(
      [2000, 5],
      BigInt(
        '22962613905485090484656664023553639680446354041773904009552854736515325227847406277133189726330125398368919292779749255468942379217261106628518627123333063707825997829062456000137755829648008974285785398012697248956323092729277672789463405208093270794180999311632479761788925921124662329907232844394066536268833781796891701120475896961582811780186955300085800543341325166104401626447256258352253576663441319799079283625404355971680808431970636650308177886780418384110991556717934409897816293912852988275811422719154702569434391547265221166310540389294622648560061463880851178273858239474974548427800576'
      ),
      '3Blue1Brown problem'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = numSubsetsDivByX(...testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
