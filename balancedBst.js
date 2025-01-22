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

  ///// find item function
  find(value) {
    
    let current = this.root;
    
    while (current) {
      
    if (value < current.data) {
      current = current.left;
    } else if (value > current.data) {
      current = current.right;
    } else {
      return current;
    }
    }
    
    return null;
  }

  ///// find function using recursion
  findRec(value) {
    
    function searchNode(node, value) {
      
      if (node === null) return null;
      
      if (value < node.data) {
          return searchNode(node.left, value);
      } else if (value > node.data) {
          return searchNode(node.right, value);
      } else {
          return node; 
      } 
    }
    return searchNode(this.root, value)
  }

    


  //// level order
  levelOrder(callback) {
       
    if (typeof callback !== 'function') {
      throw new Error ('A callback is required')
    }
    
    let current = this.root;
    let queue = [current];
    
    if (current === null) return;
    
    while(queue.length > 0) {   
      const currentNode = queue.shift();
      
      callback(currentNode);
      
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      
      if (currentNode.right) {
        queue.push(currentNode.right);
      } 
    }
  }

  ////// inorder function and helper
  inOrder(callback) {
    
    if (typeof callback !== 'function') {
      throw new Error('Provide a function')
    }
    
    this._inOrderHelper(this.root, callback)  
    
  }
  
  _inOrderHelper(current, callback) {

    if (!current) return;
    
    // traverse left
    this._inOrderHelper(current.left, callback)
    
    // traverse root
    callback(current);
    
    // traverse right
    
    this._inOrderHelper(current.right, callback)
    
  }


  ///// preOrder function and helper
   preOrder(callback) {
      if (typeof callback !== 'function') {
      throw new Error('Provide a function')
    }
    
    this._preOrderHelper(this.root, callback)
    
  }
  
  _preOrderHelper(current, callback) {
    
   if (!current) return;
   
    // root, left, right
   callback(current);
   this._preOrderHelper(current.left, callback);
   this._preOrderHelper(current.right, callback);
    
  }


  ///// post order function and helper

  postOrder(callback) {
      if (typeof callback !== 'function') {
      throw new Error('Provide a function')
    }
    
    this._postOrderHelper(this.root, callback)
  }
  
  _postOrderHelper(current, callback) {
    
   if (!current) return;
   // root, left, right
    this._postOrderHelper(current.left, callback);
    this._postOrderHelper(current.right, callback);
    callback(current);
    
  }

  ////// height function
  height(node) {
        
    if (!node) return -1;
    
    if (!node.left && !node.right) {
      return 0;
    } 
    
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    
    return 1 + Math.max(leftHeight, rightHeight);
    
  }

  /////// depth
  
  depth(node, currentNode = this.root, currentDepth = 0) {
    
    if (currentNode === null) return -1;
    
    if (currentNode === node) return currentDepth;
    
    let leftDepth = this.depth(node, currentNode.left, currentDepth + 1);
    let rightDepth = this.depth(node, currentNode.right, currentDepth + 1);
    
    return Math.max(leftDepth, rightDepth);
    
  }

  /////// is balanced
  
  isBalanced(node) {
    
    // if node is null, it's considered a balanced tree
    if (node === null) return true;
    
    // get heights
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    // difference greater than 1 is unbalanced
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    
   return this.isBalanced(node.left) && this.isBalanced(node.right);
    
  }

   ////// rebalance with inorder travesal
  
//   inOrderTraversal(node, result = []) {
    
//     if (!node) return null;
    
//     this.inOrderTraversal(node.left, result);
//     result.push(node.data);
//     this.inOrderTraversal(node.right, result);
    
//     return result;
    
//   }
  
  rebalance() {
    
    // const sortedArr = this.inOrderTraversal(node);
    
    let newArr = [];
    
    this.inOrder(node => newArr.push(node.data));
    
    return this.buildTree(newArr);
  }
  ///// 
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr);

tree.buildTree(arr, 0, arr.length - 1);

// console.log(tree.root);
// console.log(tree.depth(tree.root.left.right.right))
// console.log(tree.height(tree.root));
console.log('is tree balanced?')
console.log(tree.isBalanced(tree.root));

console.log('this is the tree');
console.log(tree);

tree.insert(12);
// console.log(tree.insert(321));

console.log('new tree after insertion')
console.log(tree);

console.log('is tree balanced?')
console.log(tree.isBalanced(tree.root));

console.log('rebalancing the tree...')
tree.root = tree.rebalance();

console.log('is tree balanced now?');
console.log(tree.isBalanced(tree.root));

