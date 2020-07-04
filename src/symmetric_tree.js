// 101. Symmetric Tree
// Easy

// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3

// But the following [1,2,2,null,3,null,3] is not:
//     1
//    / \
//   2   2
//    \   \
//    3    3

// Note:
// Bonus points if you could solve it both recursively and iteratively.

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  let stack = [root];
  let queue = [root];

  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.val);
    if (node.left != null) {
      queue.push(node.left);
    }
    if (node.right != null) {
      queue.push(node.right);
    }
  }
};

a = new TreeNode(1);
b = new TreeNode(2);
c = new TreeNode(3);

let makeTree = function (arr) {
  let root = new TreeNode(arr.shift());
  let queue = [root];
  while (queue.length > 0) {
    let node = queue.shift();
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
  return root;
};

a.left = b;
a.right = c;

isSymmetric(a);

// jasmine test cases
describe("isSymmetric()", () => {
  it("passes on single node trees", () => {
    expect(true).toBe(false);
  });
});
