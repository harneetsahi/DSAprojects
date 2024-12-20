//// balanced binary search tree

// Pseudocode of balanced binary search tree

// 1. initialize start = 0, end = length -1

// 2. mid = (start + end) / 2;

// 3. Create a tree with mid as root (lets call it A);

// 4. Recursively follow the following steps:
//   a.  Calc mid of left subtree and make it root of left subtree.
//   b.  Calc mid of right subtree and make root of right subtree.


class Node {

  constructor (data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

}
