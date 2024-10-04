import { createTree } from './createTree.js';

function getRandomNumbersArray(size) {
  const randomNumbers = [];
  for (let i = 0; i < size; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

const array = getRandomNumbersArray(10);

const tree = createTree(array);

console.log(tree.isBalanced());

tree.levelOrder((it) => console.log(it.data));
tree.preOrder((it) => console.log(it.data));
tree.postOrder((it) => console.log(it.data));
tree.inOrder((it) => console.log(it.data));

tree.insert(101);
tree.insert(102);
tree.insert(103);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

tree.levelOrder((it) => console.log(it.data));
tree.preOrder((it) => console.log(it.data));
tree.postOrder((it) => console.log(it.data));
tree.inOrder((it) => console.log(it.data));
