// TODO: not done yet

// It's not the prime factors themselves that matter, it's the way you split them
// ex. prime factors for 200 = [2,2,2,5,5] vs factors for 72 = [2,2,2,3,3]
// The number of nice divisors is the same!
// Why?
// Because num of nice divisors is the number of ways you can choose a product out of the list of prime factors
// You must choose every distinct prime factor at least once (that's what it means to be a nice divisor)
// in other words, "To be a nice divisor, you gotta have at least a 2 and a 5, everything else is optional because you're already divisible by 2 and 5"
// ex. For [2,2,2,5,5], this means the lowest number is 2*5 = 10 (i.e. the LCM), and the max number is 2^3 * 5^2 = 200
// Formula: in general, the combinations are (3 choices for how many 2's i.e. 1,2,3) * (2 choices for how many 5's i.e. 1,2) = 6 combinations
// exactly the number of nice divisors

// Next, it doesn't depend on the values of the prime factors, only the frequencies: [2,2,2,5,5] => 6 nice divisors and [2,2,2,3,3]
// This is because it only depends on the number of choices you have (see formula above)

// Next, we must determine how best to split the frequencies
// e.g. (5 of the same prime)? OR (2 of one prime and 3 of another)? OR 1 and 4? OR (1,1,3) OR (1,2,2) ...
// First, split this up by the number of primes to use
// 1 prime: {5} is the only combination
// 2 primes: {1,4} or {2,3}
// 3 primes: {1,1,3} or {1,2,2}
// 4 primes: {1,1,1,2}
// 5 primes: {1,1,1,1,1}
// I know that given a number of primes to use, the maximum product comes when they are as close together as possible
// (think rectangle vs square, fixed perimeter (i.e. sum) and want to maximize area(i.e. product))
// Ex. Given I want to split the 5 primes I have into 2 different primes, it's better to choose {2,3} than {1,4} because 2,3 are close together
// So their product is greater
// Now, the problem becomes
// 1 prime: {5}
// 2 primes: {2,3}
// 3 primes: {1,2,2}
// 4 primes: {1,1,1,2}
// 5 primes: {1,1,1,1,1}

// Next, we need to figure out which number of prime to choose
/*
primeFactors 7
1: {7}
2: {3,4}
3: {2,2,3}
4: {1,2,2,2}
5: {1,1,1...}
6: ..
7: ..


primeFactors 9
1: {9}
2: {4,5}
3: {3,3,3}
4: {2,2,2,3}
5: ...


*/

// Split a number as evenly as possible into a number of buckets
// e.g. (12, 2 buckets) => [6,6] => { 6: 2 }
// e.g. (12, 3 buckets) => [4,4,4] => { 4: 3 }
// e.g. (17, 5 buckets) => [3,3,3,4,4] => { 3: 3, 4: 2 }
const mod = Math.pow(10, 9) + 7;

function splitEvenly(n: number, numBuckets: number): { [key: number]: number } {
  const idealValue = Math.ceil(n / numBuckets);
  const numIdealBuckets = n % numBuckets;
  const oneOffIdealValue = Math.floor(n / numBuckets);
  const numOneOffBuckets = numBuckets - numIdealBuckets;
  return {
    [idealValue]: numIdealBuckets,
    [oneOffIdealValue]: numOneOffBuckets,
  };
}

function numNiceDivisors(freqOfFreqs: { [key: number]: number }): number {
  let total = 1;
  Object.entries(freqOfFreqs).forEach(([freq, freqOfFreq]) => {
    const multiple = Math.pow(Number(freq), freqOfFreq);
    total = total * multiple;
  });
  return total;
}

function maxNiceDivisors(primeFactors: number): number {
  const sqrt = Math.round(Math.sqrt(primeFactors));
  const frequencies = splitEvenly(primeFactors, sqrt);
  const total = numNiceDivisors(frequencies);
  return total;
}
