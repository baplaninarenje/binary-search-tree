import { createNode } from './createNode.js';

function buildTree(array) {
  const sortedUniqueArr = [...new Set(array)].sort((a, b) => a - b);
  return sortedArrayToBST(sortedUniqueArr);
}

function sortedArrayToBST(array) {
  if (array.length === 0) {
    return null;
  }

  const mid = Math.floor(array.length / 2);
  const root = createNode(array[mid]);

  const q = [
    [root, [0, mid - 1]],
    [root, [mid + 1, array.length - 1]],
  ];

  while (q.length > 0) {
    const [parent, [left, right]] = q.shift();

    if (left <= right && parent != null) {
      const mid = Math.floor((left + right) / 2);
      const child = createNode(array[mid]);

      if (array[mid] < parent.data) {
        parent.left = child;
      } else {
        parent.right = child;
      }

      q.push([child, [left, mid - 1]]);
      q.push([child, [mid + 1, right]]);
    }
  }

  return root;
}

export { buildTree };
