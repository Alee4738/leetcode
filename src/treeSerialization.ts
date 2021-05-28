import { TreeNode, NaryTreeNode } from './leetcodeTypes';
import { runTests, TestCase } from './testHelpers';

export function newTreeNode(val: number): TreeNode {
  return new TreeNode(val);
}

export function newNaryTreeNode(val: number): NaryTreeNode {
  return new NaryTreeNode(val);
}

/**
 * @param root root of tree
 * @returns tree values described in level-order traversal
 */
export function serializeTreeToArray(root: TreeNode | null): (number | null)[] {
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

/**
 * @param data tree values described in level-order traversal
 * @returns root of tree
 */
export function deserializeTreeFromArray(
  data: (number | null)[],
  createNode: (val: number, parent: TreeNode | null) => TreeNode = newTreeNode
): TreeNode | null {
  const firstVal = data[0];
  if (firstVal === null || firstVal === undefined) {
    return null;
  }

  const root = createNode(firstVal, null);
  const parentQueue: TreeNode[] = [root];
  let dataIndex = 1;
  while (parentQueue.length > 0) {
    // the next TreeNode whose .left and .right values will be assigned
    const parentToFill = parentQueue.shift()!;
    const leftVal = data[dataIndex];
    if (leftVal === null || leftVal === undefined) {
      parentToFill.left = null;
    } else {
      parentToFill.left = createNode(leftVal, parentToFill);
      parentQueue.push(parentToFill.left);
    }
    dataIndex += 1;

    const rightVal = data[dataIndex];
    if (rightVal === null || rightVal === undefined) {
      parentToFill.right = null;
    } else {
      parentToFill.right = createNode(rightVal, parentToFill);
      parentQueue.push(parentToFill.right);
    }
    dataIndex += 1;
  }
  return root;
}

/**
 * @param data tree values described in level-order traversal
 * Each group of children is separated by the null value.
 * @returns root of tree
 */
export function deserializeNaryTreeFromArray(
  data: (number | null)[],
  createNode: (
    val: number,
    parent: NaryTreeNode | null
  ) => NaryTreeNode = newNaryTreeNode
): NaryTreeNode | null {
  const firstVal = data[0];
  if (firstVal === null || firstVal === undefined) {
    return null;
  }

  const root = createNode(firstVal, null);
  const parentQueue: NaryTreeNode[] = [root];
  let dataIndex = 2;
  while (parentQueue.length > 0) {
    const parentToFill = parentQueue.shift()!;
    while (data[dataIndex] !== null && data[dataIndex] !== undefined) {
      const children = parentToFill.children ?? [];
      const node = createNode(data[dataIndex]!, parentToFill);
      children.push(node);
      parentQueue.push(node);
      dataIndex++;
    }
    if (data[dataIndex] === null) {
      dataIndex++;
    }
  }
  return root;
}

/**
 * @see deserializeTreeFromArray
 */
export const makeTreeFromArray = deserializeTreeFromArray;

export function serializeTreeToJson(root: TreeNode | null): string {
  return JSON.stringify(root);
}

export function deserializeTreeFromJson(data: string): TreeNode | null {
  return JSON.parse(data);
}

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  return serializeTreeToArray(root).join(',');
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
  return deserializeTreeFromArray(dataArr, newTreeNode);
}

describe(serializeTreeToArray.name, () => {
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

  runTests(testCases, (testCase) => {
    const actualResult = serializeTreeToArray(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

describe(deserializeTreeFromArray.name, () => {
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

  runTests(testCases, (testCase) => {
    const actualResult = deserializeTreeFromArray(testCase.input, newTreeNode);
    expect(actualResult).toEqual(testCase.expectedOutput);
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

  runTests(testCases, (testCase) => {
    const actualResult = serialize(deserialize(testCase.input));
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

describe(serializeTreeToJson.name, () => {
  const testCases: TestCase<TreeNode | null, string>[] = [
    new TestCase(null, 'null'),
    new TestCase(
      new TreeNode(1),
      '{"val":1,"left":null,"right":null}',
      'one node'
    ),
    new TestCase(
      new TreeNode(1, null, new TreeNode(2)),
      '{"val":1,"left":null,"right":{"val":2,"left":null,"right":null}}',
      'no left, has right'
    ),
    new TestCase(
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      '{"val":1,"left":{"val":2,"left":null,"right":null},"right":{"val":3,"left":null,"right":null}}',
      'has left, has right'
    ),
    new TestCase(
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3,
          new TreeNode(4),
          new TreeNode(5))),
      '{"val":1,"left":{"val":2,"left":null,"right":null},"right":{"val":3,"left":{"val":4,"left":null,"right":null},"right":{"val":5,"left":null,"right":null}}}'
    ),
    new TestCase(
      // prettier-ignore
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4)),
        new TreeNode(3)),
      '{"val":1,"left":{"val":2,"left":{"val":4,"left":null,"right":null},"right":null},"right":{"val":3,"left":null,"right":null}}'
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
      '{"val":1,"left":{"val":2,"left":{"val":4,"left":null,"right":{"val":6,"left":null,"right":{"val":8,"left":null,"right":null}}},"right":null},"right":{"val":3,"left":null,"right":{"val":5,"left":{"val":7,"left":null,"right":null},"right":null}}}',
      'big tree'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = serializeTreeToJson(testCase.input);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

describe(deserializeTreeFromArray.name, () => {
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

  runTests(testCases, (testCase) => {
    const actualResult = deserializeTreeFromArray(testCase.input, newTreeNode);
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});

describe(deserializeNaryTreeFromArray.name, () => {
  const testCases: TestCase<(number | null)[], NaryTreeNode | null>[] = [
    new TestCase([], null),
    new TestCase([1], new NaryTreeNode(1), 'one node'),
    new TestCase(
      [1, null, 2],
      new NaryTreeNode(1, [new NaryTreeNode(2)]),
      'one parent, one child'
    ),
    new TestCase(
      [1, null, 2, 3, 4, null, 5],
      // prettier-ignore
      new NaryTreeNode(1, [
        new NaryTreeNode(2, [
          new NaryTreeNode(5)
        ]),
        new NaryTreeNode(3),
        new NaryTreeNode(4)
      ]),
      'two levels'
    ),
    new TestCase(
      [1, null, 3, 2, 4, null, 5, 6],
      // prettier-ignore
      new NaryTreeNode(1, [
        new NaryTreeNode(3, [
          new NaryTreeNode(5),
          new NaryTreeNode(6)
        ]),
        new NaryTreeNode(2),
        new NaryTreeNode(4)
      ]),
      'medium tree'
    ),
  ];

  runTests(testCases, (testCase) => {
    const actualResult = deserializeNaryTreeFromArray(
      testCase.input,
      newNaryTreeNode
    );
    expect(actualResult).toEqual(testCase.expectedOutput);
  });
});
