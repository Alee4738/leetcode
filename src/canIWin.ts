// TODO: not done yet, time limit exceeded
// it can be done without calculating the answer for all desiredTotals

function nextNumber(num: number[], maxDigit: number): number[] | undefined {
  const nextNum = Array.from(num);
  let i = nextNum.length - 1;
  let isCarryingOver = false;
  while (i >= 0) {
    // console.log('before', nextNum);
    nextNum[i]++;
    // console.log('after', nextNum);
    const maxDigitForThisIndex = maxDigit + i - (nextNum.length - 1);
    // console.log('maxDigitForThisIndex', maxDigitForThisIndex);
    if (nextNum[i] > maxDigitForThisIndex) {
      // console.log('Carrying over');
      i--;
      isCarryingOver = true;
    } else {
      // console.log('Adding');
      for (let j = i + 1; j < nextNum.length; j++) {
        nextNum[j] = nextNum[j - 1] + 1;
      }
      isCarryingOver = false;
    }
    if (!isCarryingOver) {
      return nextNum;
    }
  }
}

function canWin(choices: number[], cache: Map<string, number[]>): void {
  // console.log('canWin', choices);
  const seen = new Map<number, number>();

  for (const myChoice of choices) {
    // console.log('If I choose', myChoice);
    const theirChoices = choices.filter((num) => num !== myChoice);
    const theirChoicesAsString = theirChoices.join(',');
    const theirWins = (cache.get(theirChoicesAsString) ?? []).map(
      (num) => num + myChoice
    );
    // console.log('their wins', theirWins);
    for (const totalForWhichTheyWin of theirWins) {
      seen.set(totalForWhichTheyWin, (seen.get(totalForWhichTheyWin) ?? 0) + 1);
    }
  }
  const result = [];
  const maxSum = choices.reduce((acc, cur) => acc + cur);
  for (let i = 1; i <= maxSum; i++) {
    const freq = seen.get(i);
    if (freq !== choices.length) {
      result.push(i);
    }
  }
  // console.log('my wins', result);
  cache.set(choices.join(','), result);
}

function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
  if (desiredTotal === 0) {
    return true;
  }

  const n = maxChoosableInteger;
  // Map from "the set of numbers I can choose from" as a string to "the set of desiredTotals where I am guaranteed a win"
  const cache = new Map<string, number[]>();

  // Fill the cache from bottom up
  const prevChoices: string[][] = [];
  for (let numChoices = 1; numChoices <= n; numChoices++) {
    let choices: number[] | undefined = [];
    for (let i = 1; i <= numChoices; i++) {
      choices.push(i);
    }
    prevChoices.push([]);
    const pcl = prevChoices.length;
    while (choices !== undefined) {
      canWin(choices, cache);
      prevChoices[pcl - 1].push(choices.join(','));
      choices = nextNumber(choices, maxChoosableInteger);
    }
    if (numChoices > 1) {
      const throwAway = prevChoices.shift()!;
      for (const choiceList of throwAway) {
        cache.delete(choiceList);
      }
    }
  }
  // console.log(cache);

  const finalChoices: number[] = [];
  for (let i = 1; i <= n; i++) {
    finalChoices.push(i);
  }
  return (cache.get(finalChoices.join(',')) ?? []).includes(desiredTotal);
}
