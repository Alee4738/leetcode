// It's a class so that you can call the constructor
export class TestCase<InputType, OutputType> {
  constructor(
    public input: InputType,
    public expectedOutput: OutputType,
    public desc?: string
  ) {}
}

/**
 * F for Focus, similar to jasmine's fit()
 */
export class FTestCase<InputType, OutputType> extends TestCase<
  InputType,
  OutputType
> {}
/**
 * X for "cross out", similar to jasmine's xit()
 */
export class XTestCase<InputType, OutputType> extends TestCase<
  InputType,
  OutputType
> {}

/**
 * Middleware that checks type of TestCase to run jasmine's it() and fit()
 * @param testFunc call jasmine's expect() inside this method
 */
export function runTests<InputType, OutputType>(
  testCases: TestCase<InputType, OutputType>[],
  testFunc: (testCase: TestCase<InputType, OutputType>) => void
): void {
  testCases.forEach((testCase) => {
    if (testCase instanceof FTestCase) {
      fit(testCase.desc ?? 'None', () => testFunc(testCase));
    } else if (!(testCase instanceof XTestCase)) {
      it(testCase.desc ?? 'None', () => testFunc(testCase));
    }
  });
}
