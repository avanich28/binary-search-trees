#!/usr/bin/env node
"use strict";

// Binary Search Trees
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.trunc((start + end) / 2);

    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let temp = this.root;
    while (true) {
      // Remove duplicate values
      if (newNode.value === temp.value) return undefined;

      if (newNode.value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
    return this;
  }

  deleteNode(root, value) {
    // Base case
    if (root === null) return null;

    // Recursive case
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // value === root.value
      // No child
      if (!root.left && !root.right) return null;

      // One child
      if (!root.right) return root.left;
      else if (!root.left) return root.right;

      // Have both child
      // 1) find parent node and replace node
      let parent = root;
      let replaceNode = root.right;
      while (replaceNode.left !== null) {
        parent = replaceNode;
        replaceNode = replaceNode.left;
      }

      // 2) Replace delete node by the right node/leaf
      if (parent !== root) {
        parent.left = replaceNode.right;
      } else {
        parent.right = replaceNode.right;
      }

      // 3) Set delete value to the minimum node value
      root.value = replaceNode.value;

      return root;
    }
    return root;
  }

  find(value) {
    let temp = this.root;
    while (true) {
      if (temp === null) return undefined;
      if (value < temp.value) temp = temp.left;
      else if (value > temp.value) temp = temp.right;
      else return temp;
    }
  }

  // Breadth-first level
  levelOrder(arr = [], queue = [this.root]) {
    if (queue.length === 0) return arr;

    let store = [];
    while (queue.length) {
      let temp = queue.shift();
      arr.push(temp.value);
      if (temp.left) store.push(temp.left);
      if (temp.right) store.push(temp.right);
    }

    return this.levelOrder(arr, store);
  }

  // Depth-first search
  // LDR
  inOrder() {
    if (!this.root) return undefined;
    let arr = [];

    function traverse(curNode) {
      if (curNode.left) traverse(curNode.left);
      arr.push(curNode.value);
      if (curNode.right) traverse(curNode.right);
    }
    traverse(this.root);

    return arr;
  }

  // LRD
  preOrder() {
    if (!this.root) return undefined;
    let arr = [];

    function traverse(curNode) {
      arr.push(curNode.value);
      if (curNode.left) traverse(curNode.left);
      if (curNode.right) traverse(curNode.right);
    }
    traverse(this.root);

    return arr;
  }

  // DLR
  postOrder() {
    if (!this.root) return undefined;
    let arr = [];

    function traverse(curNode) {
      if (curNode.left) traverse(curNode.left);
      if (curNode.right) traverse(curNode.right);
      arr.push(curNode.value);
    }
    traverse(this.root);

    return arr;
  }

  height(node) {
    if (node === undefined) return undefined;
    if (node === null) return -1;

    let left = this.height(node.left);
    let right = this.height(node.right);

    return Math.max(left, right) + 1;
  }

  depth(node, temp = this.root, count = 0) {
    if (node === undefined) return undefined;

    // Base case
    if (node.value === temp.value) return count;

    // Select
    count++;
    if (node.value < temp.value) temp = temp.left;
    else temp = temp.right;

    // Recursion case
    return this.depth(node, temp, count);
  }

  isBalanced(node = this.root) {
    if (node === null) return -1;

    let left = this.isBalanced(node.left);
    let right = this.isBalanced(node.right);

    return node === this.root
      ? Math.abs(left - right) <= 1
      : Math.max(left, right) + 1;
  }

  rebalance(arr) {
    const data = [...new Set(arr)];
    const root = this.buildTree(data, 0, arr.length - 1);
    return root;
  }
}

function merge(arrA, arrB) {
  let i = 0,
    j = 0;
  let arrC = [];

  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] < arrB[j]) {
      arrC.push(arrA[i]);
      i++;
    } else {
      arrC.push(arrB[j]);
      j++;
    }
  }

  for (let k = i; k < arrA.length; k++) arrC.push(arrA[k]);

  for (let k = j; k < arrB.length; k++) arrC.push(arrB[k]);

  return arrC;
}

function mergeSort(arr) {
  arr = [...new Set(arr)]; // Remove Duplicate
  if (arr.length === 0) return [];

  // Base case
  if (arr.length === 1) return arr;

  // Recursive case
  const mid = Math.trunc(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

const myTree = new Tree(
  mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
);

myTree.insert(28);
myTree.insert(29);
myTree.insert(30);
myTree.delete(8);
console.log(myTree.find(67)); // Node {value: 67, left: Node, right: Node}
console.log(myTree.levelOrder()); //  [9, 4, 67, 1, 5, 23, 324, 3, 7, 28, 6345]
console.log(myTree.inOrder()); // [1, 3, 4, 5, 7, 9, 23, 28, 67, 324, 6345]
console.log(myTree.preOrder()); // [9, 4, 1, 3, 5, 7, 67, 23, 28, 324, 6345]
console.log(myTree.postOrder()); // [3, 1, 7, 5, 4, 28, 23, 6345, 324, 67, 9]
console.log(myTree.height(myTree.find(9))); // 4
console.log(myTree.depth(myTree.find(23))); // 2
console.log(myTree.isBalanced()); // false
const reBalanceTree = myTree.rebalance(myTree.inOrder());

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;

  if (node.right !== null)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

  if (node.left !== null)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
prettyPrint(myTree.root);
prettyPrint(reBalanceTree);
