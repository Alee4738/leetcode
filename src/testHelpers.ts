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
