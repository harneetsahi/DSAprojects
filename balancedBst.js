//// balanced binary search tree

// Pseudocode of balanced binary search tree

// 1. initialize start = 0, end = length -1

// 2. mid = (start + end) / 2;

// 3. Create a tree with mid as root (lets call it A);

// 4. Recursively follow the following steps:
//   a.  Calc mid of left subtree and make it root of left subtree.
//   b.  Calc mid of right subtree and make root of right subtree.



//// Node class

class Node {

  constructor (data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

}


//// Tree class

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  //// build tree function
  buildTree(arr) {
    let sortedArr = [...new Set(arr)].sort((a,b) => a-b);

    function helper(sortedArr, start, end) {
      if (start > end) return null;

      let mid = start + Math.floor((end - start) / 2);

      let node = new Node(sortedArr[mid]);

      node.left = helper(sortedArr, start, mid-1);
      node.right = helper(sortedArr, mid+1, end)

      return node;
      
    }

    return helper(sortedArr, 0, sortedArr.length - 1);
    
  }

  //// insert function
  insert(value) {
    
    let newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return
    }
    
    let current = this.root;
    
    while(current) {
      
      if (value < current.data) {
        
          if (!current.left) {
            current.left = newNode;
            return
          }        
          current = current.left
        
      } else if (value > current.data ) {
       
        if (!current.right) {
          current.right = newNode
          return;
        }
        current = current.right;
        
      } else {
        return;
      }
    }
  }

  //// delete function

  deleteItem(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(root, value) {

    if (!root) return root;

    if (value < root.data) {
      root.left = this._deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this._deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null
      } else if (!root.left) {
        return root.right
      } else if (!root.right) {
        return root.left;
      }

      root.data = this._findSuccessor(root.right);
      root.right = this._deleteNode(root.right, root.data);
      
    }
    return root;
  }

  _findSuccessor(root) {
    
    let minVal = root.data;
    
    while(root.left) {
      minVal = root.left.data;
      root = root.left;
    }
    return minVal;
  }

    


  ////

}
