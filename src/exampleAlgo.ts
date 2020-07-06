// Show the pattern of how to add an algorithm and its tests using TypeScript

// What do I want to happen?
// tsc, then run jasmine
// or just run ts-node jasmine <current-file>
// Also, I want to be able to set breakpoints in the typescript and hit them
export function exampleAlgorithm(nums: number[]): number {
  return 3;
}

describe(exampleAlgorithm.name, () => {
  it('should return 3', () => {
    // Arrange
    const dummyNums = [1, 10];

    // Act
    const actual = exampleAlgorithm(dummyNums);

    // Assert
    const expected = 3;
    expect(actual).toEqual(expected);
  });
});
