class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    buildTree(array) {
        // Filter out duplicate values
        const filteredArray = [...new Set(array)].sort((num1, num2) => num1 - num2);
        this.root = this.buildTreeRec(filteredArray, 0, filteredArray.length - 1);
    }

    buildTreeRec(array, start, end) {
        if (start > end) return null;

        const middle = Math.floor((start + end) / 2);
        const root = new Node(array[middle]);
        
        root.left = this.buildTreeRec(array, start, middle - 1);
        root.right = this.buildTreeRec(array, middle + 1, end);

        return root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert(value, currentNode = this.root) {
        if (currentNode === null) return new Node(value);

        if (currentNode.data === value) {
            console.log('Value already exists!');
            return currentNode;
        }

        if (value < currentNode.data) {
            currentNode.left = this.insert(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.insert(value, currentNode.right);
        }

        return currentNode;
    }

    getSuccessor(currentNode) {
        // move right and go left until null to find the successor!
        currentNode = currentNode.right;

        while (currentNode !== null && currentNode.left !== null) {
            currentNode = currentNode.left;
        }

        return currentNode;
    }

    delete(value, currentNode = this.root) {
        // At the end of list, no value to be deleted!
        if (currentNode === null) return currentNode;

        if (value < currentNode.data) {
            currentNode.left = this.delete(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.delete(value, currentNode.right);
        } else {
            if (currentNode.left === null) return currentNode.right;
            if (currentNode.right === null) return currentNode.left;

            const successor = this.getSuccessor(currentNode);
            currentNode.data = successor.data;
            currentNode.right = this.delete(successor.data, currentNode.right);
        }

        return currentNode;
    }

    find(value, currentNode = this.root) {
        if (currentNode === null) {
            console.log('No value found!');
            return currentNode;
        };

        if (currentNode.data === value) {
            return currentNode;
        }

        if (value < currentNode.data) {
            return this.find(value, currentNode.left);
        } else if (value > currentNode.data) {
            return this.find(value, currentNode.right);
        }
    }
}

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
/*
tree.insert(77);
tree.delete(67);
tree.insert(67);
*/
console.log(tree.find(1));
tree.prettyPrint(tree.root);