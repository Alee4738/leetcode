/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from './leetcodeTypes';

/*
Idea: split up the problem
all trees = trees with root node 1 + trees with root node 2 + ... + trees with root node n

So, given a node value k in [1..n], how to generate all the trees?
On the left, generate trees [1..(k-1)]
On the right, generate trees [(k+1)..n], which can use the answer for [1..(n-k)] + offset k

So, keep a cache: (TreeNode | null)[]
where cache[j] === generateTrees(j) (i.e. the list of trees from 1 to j)
*/

// O(n) time and O(n) space, needs to walk exactly the size of original tree
function addToTree(tree: TreeNode | null, value: number): TreeNode | null {
  if (tree === null) {
    return null;
  } else {
    const newRootNode = new TreeNode(tree.val + value);
    if (tree.left) {
      newRootNode.left = addToTree(tree.left, value);
    }
    if (tree.right) {
      newRootNode.right = addToTree(tree.right, value);
    }
    return newRootNode;
  }
}

function generateTrees(n: number): Array<TreeNode | null> {
  const cache: Array<Array<TreeNode | null>> = [[null], [new TreeNode(1)]];
  for (let i = 2; i <= n; i++) {
    cache[i] = [];
    for (let rn = 1; rn <= i; rn++) {
      const treesOnLeft = cache[rn - 1]; // trees from 1 to (rn - 1)
      const rightOffset = rn;
      const treesOnRightBeforeOffset = cache[i - rn]; // trees from (rn + 1) to i, offset by rn
      const treesOnRight = treesOnRightBeforeOffset.map(
        (rightTree: TreeNode | null) => {
          return addToTree(rightTree, rightOffset);
        }
      );

      for (const leftTree of treesOnLeft) {
        for (const rightTree of treesOnRight) {
          const treeWithRootNodeRn = new TreeNode(rn, leftTree, rightTree);
          cache[i].push(treeWithRootNodeRn);
        }
      }
    }
  }
  return cache[n];
}
