// It's a class so that you can call the constructor
export class TestCase<InputType, OutputType> {
  constructor(
    public input: InputType,
    public expectedOutput: OutputType,
    public desc?: string
  ) {}
}
