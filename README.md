# binary-search-trees

Binary Search Trees exercise in the part of computer science within The Odin Project's course

## Features

- Build a `Node` class / factory. It should have an attribute for the data it stores as well as its left and right children.
- Build a `Tree` class / factory which accepts an array when initialized. The `Tree` class should have a `root` attribute which uses the return value of `buildTree` which you’ll write next.
- Write a `buildTree` function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of `Node` objects appropriately placed (don’t forget to sort and remove duplicates!). The `buildTree` function should return the level-0 root node.
- Write an `insert` and `delete` functions which accepts a value to insert/delete (you’ll have to deal with several cases for delete such as when a node has children or not).
- Write a `find` function which accepts a value and returns the node with the given value.
- Write a `levelOrder` function which accepts another function as a parameter. `levelOrder` should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given.
- Write `inorder`, `preorder`, and `postorder` functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
- Write a `height` function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
- Write a `depth` function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
- Write a `isBalanced` function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
- Write a `rebalance` function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the `buildTree` function.
