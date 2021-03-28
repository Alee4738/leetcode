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

class CBTInserter {
  size: number;
  constructor(public root: TreeNode | null) {
    this.size = this.count_nodes(root);
    console.log('init with size', this.size);
  }

  insert(v: number): number {
    console.log('');
    console.log('insert', v);
    if (this.root === null) {
      this.root = new TreeNode(v);
      return v;
    }

    const nextParent = this.get_next_parent(
      this.root,
      this.size,
      this.depth_of_complete_tree(this.size)
    );
    console.log('nextParent is', nextParent?.val ?? null);
    if (nextParent === null) {
      return null;
    } else if (nextParent.left === null) {
      console.log('inserting left');
      nextParent.left = new TreeNode(v);
    } else {
      console.log('inserting right');
      nextParent.right = new TreeNode(v);
    }
    this.size++;
    return nextParent.val;
  }

  get_root(): TreeNode | null {
    return this.root;
  }

  private count_nodes(tree: TreeNode | null): number {
    if (tree === null) {
      return 0;
    }
    return 1 + this.count_nodes(tree.left) + this.count_nodes(tree.right);
  }

  /*
    a = max_tree_size(depth) - size
    a 0 => new tree, go left

    d a ans
    1 0 this
    2 1 this
    2 0 l

    3 3 l
    3 2 r
    3 1 r
    3 0 l

    4 7 l
    4 6 l
    4 5 l
    4 4 r
    4 3 r
    4 2 r
    4 1 r
    4 0 l

    */
  private get_next_parent(
    tree: TreeNode | null,
    size: number,
    depth: number
  ): TreeNode | null {
    if (tree === null) {
      return null;
    }
    console.log('get_next_parent val', tree.val, 'size', size, 'depth', depth);
    if (tree.left === null || tree.right === null) {
      return tree;
    }
    const distanceFromFull = this.max_tree_size(depth) - size;
    const maxNodesAtThisLevel = Math.pow(2, depth - 1);
    console.log('distanceFromFull', distanceFromFull);
    console.log('maxNodesAtThisLevel', maxNodesAtThisLevel);

    const nextSize = size - (this.max_tree_size(depth - 1) + 1);
    if (distanceFromFull === 0) {
      console.log('go left');
      return this.get_next_parent(tree.left, nextSize, depth - 1);
    }

    const a =
      (distanceFromFull + maxNodesAtThisLevel - 1) % maxNodesAtThisLevel;
    console.log('a', a);
    if (a < maxNodesAtThisLevel / 2) {
      console.log('go right');
      return this.get_next_parent(tree.right, nextSize, depth - 1);
    } else {
      console.log('go left');
      return this.get_next_parent(tree.left, nextSize, depth - 1);
    }
  }

  // depth of tree with 1 node is 1
  private max_tree_size(depth: number): number {
    return Math.pow(2, depth) - 1;
  }

  private depth_of_complete_tree(size: number): number {
    let depth = 1;
    while (true) {
      const maxTreeSize = this.max_tree_size(depth);
      if (size <= maxTreeSize) {
        return depth;
      }
      depth++;
    }
  }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */
