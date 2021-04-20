import { TreeNode } from './leetcodeTypes';
import { FTestCase, TestCase, XTestCase } from './testHelpers';

export function serializeTree(root: TreeNode | null): (number | null)[] {
  const queue: (TreeNode | null)[] = [root];
  const result: (number | null)[] = [];
  while (queue.length > 0) {
    const node: TreeNode | null = queue.shift() ?? null;
    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left, node.right);
    }
  }
  let backwardsIndex = result.length - 1;
  while (backwardsIndex >= 0 && result[backwardsIndex] === null) {
    result.pop();
    backwardsIndex--;
  }
  return result;
}

export function deserializeTree(data: (number | null)[]): TreeNode | null {
  const firstVal = data[0];
  if (firstVal === null || firstVal === undefined) {
    return null;
  }

  const root = new TreeNode(firstVal);
  const parentQueue: TreeNode[] = [root];
  let dataIndex = 1;
  while (parentQueue.length > 0) {
    // the next TreeNode whose .left and .right values will be assigned
    const parentToFill = parentQueue.shift()!;
    const leftVal = data[dataIndex];
    if (leftVal === null || leftVal === undefined) {
      parentToFill.left = null;
    } else {
      parentToFill.left = new TreeNode(leftVal);
      parentQueue.push(parentToFill.left);
    }
    dataIndex += 1;

    const rightVal = data[dataIndex];
    if (rightVal === null || rightVal === undefined) {
      parentToFill.right = null;
    } else {
      parentToFill.right = new TreeNode(rightVal);
      parentQueue.push(parentToFill.right);
    }
    dataIndex += 1;
  }
  return root;
}

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  return serializeTree(root).join(',');
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const dataAsStringArr = data.split(',');
  const dataArr = dataAsStringArr.map((element) => {
    const isNull = element.length === 0;
    if (isNull) {
      return null;
    }
    return +element;
  });
  return deserializeTree(dataArr);
}

describe(serializeTree.name, () => {
  const testCases: TestCase<TreeNode | null, (number | null)[]>[] = [
    new TestCase(null, []),
    new TestCase(new TreeNode(1), [1], 'one node'),
    new TestCase(
      new TreeNode(1, null, new TreeNode(2)),
      [1, null, 2],
      'no left, has right'
    ),
    new TestCase(
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      [1, 2, 3],
      'has left, has right'
    ),
    new TestCase(
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3,
          new TreeNode(4),
          new TreeNode(5))),
      [1, 2, 3, null, null, 4, 5],
      'nulls exist if there are non-nulls to be printed later (2s null children must be printed because 4 and 5 are printed later)'
    ),
    new TestCase(
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4)),
        new TreeNode(3)),
      [1, 2, 3, 4],
      'nulls are cut off once the last non-null is printed (3 has null children, but theyre not printed)'
    ),
    new TestCase(
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4,
            null,
            new TreeNode(6,
              null,
              new TreeNode(8))),
          null),
        new TreeNode(3,
          null,
          new TreeNode(5,
            new TreeNode(7),
            null))),
      [1, 2, 3, 4, null, null, 5, null, 6, 7, null, null, 8],
      'big tree'
    ),
  ];

  testCases.forEach((testCase) => {
    const run = () => {
      const actualResult = serializeTree(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    };
    if (testCase instanceof FTestCase) {
      fit(testCase.desc ?? 'None', run);
    } else if (!(testCase instanceof XTestCase)) {
      it(testCase.desc ?? 'None', run);
    }
  });
});

describe(deserializeTree.name, () => {
  const testCases: TestCase<(number | null)[], TreeNode | null>[] = [
    new TestCase([], null),
    new TestCase([1], new TreeNode(1), 'one node'),
    new TestCase(
      [1, null, 2],
      new TreeNode(1, null, new TreeNode(2)),
      'no left, has right'
    ),
    new TestCase(
      [1, 2, 3, null, null, null, null, 1000],
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      'more inputs than are allowed in the tree, the extra inputs are ignored'
    ),
    new TestCase(
      [1, 2, 3],
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      'has left, has right'
    ),
    new TestCase(
      [1, 2, 3, null, null, 4, 5],
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3,
          new TreeNode(4),
          new TreeNode(5))),
      'nulls exist if there are non-nulls to be printed later (2s null children must be printed because 4 and 5 are printed later)'
    ),
    new TestCase(
      [1, 2, 3, 4],
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4)),
        new TreeNode(3)),
      'nulls are cut off once the last non-null is printed (3 has null children, but theyre not printed)'
    ),
    new TestCase(
      [1, 2, 3, 4, null, null, 5, null, 6, 7, null, null, 8],
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4,
            null,
            new TreeNode(6,
              null,
              new TreeNode(8))),
          null),
        new TreeNode(3,
          null,
          new TreeNode(5,
            new TreeNode(7),
            null))),
      'big tree'
    ),
  ];

  testCases.forEach((testCase) => {
    const run = () => {
      const actualResult = deserializeTree(testCase.input);
      expect(actualResult).toEqual(testCase.expectedOutput);
    };
    if (testCase instanceof FTestCase) {
      fit(testCase.desc ?? 'None', run);
    } else if (!(testCase instanceof XTestCase)) {
      it(testCase.desc ?? 'None', run);
    }
  });
});

describe(`${serialize.name}(${deserialize.name}(valid tree as string)) = valid tree as string`, () => {
  const testCases: TestCase<string, string>[] = [
    new TestCase('', ''),
    new TestCase('1', '1', 'one node'),
    new TestCase('1,,2', '1,,2', 'no left, has right'),
    new TestCase('1,2,3', '1,2,3', 'has left, has right'),
    new TestCase(
      '1,2,3,,,4,5',
      '1,2,3,,,4,5',
      'nulls exist if there are non-nulls to be printed later (2s null children must be printed because 4 and 5 are printed later)'
    ),
    new TestCase(
      '1,2,3,4',
      '1,2,3,4',
      'nulls are cut off once the last non-null is printed (3 has null children, but theyre not printed)'
    ),
    new TestCase('1,2,3,4,,,5,,6,7,,,8', '1,2,3,4,,,5,,6,7,,,8', 'big tree'),
  ];

  testCases.forEach((testCase) => {
    const run = () => {
      const actualResult = serialize(deserialize(testCase.input));
      expect(actualResult).toEqual(testCase.expectedOutput);
    };
    if (testCase instanceof FTestCase) {
      fit(testCase.desc ?? 'None', run);
    } else if (!(testCase instanceof XTestCase)) {
      it(testCase.desc ?? 'None', run);
    }
  });
});
