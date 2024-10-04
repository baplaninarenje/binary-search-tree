import { buildTree } from './buildTree.js';
import { createNode } from './createNode.js';

function createTree(array) {
  let root = buildTree(array);

  function insert(value) {
    const temp = createNode(value);

    // If tree is empty
    if (root === null) return temp;

    // Find the node who is going to have
    // the new node temp as its child
    let parent = null;
    let curr = root;
    while (curr !== null) {
      parent = curr;
      if (curr.data > value) curr = curr.left;
      else if (curr.data < value) curr = curr.right;
      else return root; // Key already exists
    }

    // If x is smaller, make it left
    // child, else right child
    if (parent.data > value) parent.left = temp;
    else parent.right = temp;

    return root;
  }

  function deleteItem(value) {
    let curr = root;
    let prev = null;

    // Check if the data is actually present in the BST.
    // The variable prev points to the parent of the data
    // to be deleted.
    while (curr !== null && curr.data !== value) {
      prev = curr;
      if (value < curr.data) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    // data not present
    if (curr === null) {
      return root;
    }

    // Check if the node to be deleted has at most one child.
    if (curr.left === null || curr.right === null) {
      let newCurr = curr.left === null ? curr.right : curr.left;

      // Check if the node to be deleted is the root.
      if (prev === null) {
        return newCurr;
      }

      // Check if the node to be deleted is prev's left or
      // right child and then replace this with newCurr.
      if (curr === prev.left) {
        prev.left = newCurr;
      } else {
        prev.right = newCurr;
      }
    } else {
      // Node to be deleted has two children.
      let p = null;
      let temp = curr.right;
      while (temp.left !== null) {
        p = temp;
        temp = temp.left;
      }

      if (p !== null) {
        p.left = temp.right;
      } else {
        curr.right = temp.right;
      }

      curr.data = temp.data;
    }

    return root;
  }

  function find(value) {
    let temp = root;

    while (temp !== null) {
      if (value < temp.data) {
        temp = temp.left;
      } else if (value > temp.data) {
        temp = temp.right;
      } else {
        return temp;
      }
    }

    return null;
  }

  function checkCallback(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback function is required but you provided a' +
          ` [${typeof callback}] instead.`
      );
    } else return true;
  }

  function levelOrder(callback) {
    checkCallback(callback);

    if (root === null) return;
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      const current = queue[0];
      callback(current);

      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);

      queue.shift();
    }
  }

  function levelOrderRecursion(callback) {
    checkCallback(callback);
    if (root === null) return;
    const queue = [];
    queue.push(root);

    (function populateQueue() {
      if (queue.length === 0) return;
      else {
        const current = queue[0];
        callback(current);

        if (current.left != null) queue.push(current.left);
        if (current.right != null) queue.push(current.right);

        queue.shift();
      }
      return populateQueue();
    })();
  }

  function preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback function is required but you provided a' +
          ` [${typeof callback}] instead.`
      );
    }

    function traverse(node) {
      if (node === null) return;

      callback(node);

      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);
  }

  function inOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback function is required but you provided a' +
          ` [${typeof callback}] instead.`
      );
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(root);
  }

  function postOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'Callback function is required but you provided a' +
          ` [${typeof callback}] instead.`
      );
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(root);
  }

  function height(node) {
    if (node === null) {
      return -1;
    } else {
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      return 1 + Math.max(leftHeight, rightHeight);
    }
  }

  function depth(node) {
    if (node === null) return -1;

    let d = 0;
    let current = node;

    while (current) {
      d++;
      current = findParent(current, root);
    }

    return d - 1;
  }

  function findParent(node, root) {
    if (root === null) return null;
    if (root.left === node || root.right === node) {
      return root;
    }

    let leftParent = findParent(node, root.left);
    if (leftParent !== null) return leftParent;

    return findParent(node, root.right);
  }

  function isBalanced() {
    if (this.root === null) {
      return -1;
    } else {
      const leftHeight = height(this.root.left);
      const rightHeight = height(this.root.right);
      const diff = Math.abs(leftHeight - rightHeight);

      return diff === 1 || diff === 0;
    }
  }

  function rebalance() {
    const array = [];
    if (!this.isBalanced()) this.inOrder((node) => array.push(node.data));

    if (array.length !== 0) {
      this.root = buildTree(array);
      return true;
    } else return false;
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    levelOrderRecursion,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export { createTree };
