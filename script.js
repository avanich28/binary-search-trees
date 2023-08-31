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
    console.log(this.root);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.trunc((start + end) / 2);

    const root = new Node(arr[mid]);
    console.log(root);

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
  if (arr.length === 0) return [];

  // Base case
  if (arr.length === 1) return arr;

  // Recursive case
  const mid = Math.trunc(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

const myTree = new Tree([
  ...new Set(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])),
]); // remove duplicate values

myTree.insert(28);
myTree.delete(8);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;

  if (node.right !== null)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

  if (node.left !== null)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
prettyPrint(myTree.root);
