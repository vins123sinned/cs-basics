// Create board data structure
class Board {
    constructor() {
        this.height = 8;
        this.length = 8;
        this.adjacencyList = null;
    }

    checkLocation(height, length) {
        const acceptableValues = [0, 1, 2, 3, 4, 5, 6, 7];

        return acceptableValues.includes(height) && acceptableValues.includes(length);
    }

    possibleMoves(height, length) {
        let possibleMoves = [];

        const moves = [
            [1 , 2], [1, -2],
            [2, 1], [2, -1],
            [-1, 2], [-1, -2],
            [-2, 1], [-2, -1],
        ];

        moves.forEach((move) => {
            if (this.checkLocation(height + move[0], length + move[1])) {
                possibleMoves.push([height + move[0], length + move[1]]);
            }
        });
        
        return possibleMoves;
    }

    createAdjacencyList() {
        let array = [];

        // quadratic complexity
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.length; j++) {
                array.push(this.possibleMoves(i, j));
            }
        }

        this.adjacencyList = array;
    }

    findPath(currentNode, targetNode) {
        if (!currentNode) return null;

        let queue = [];
        queue.push(currentNode);

        while (queue.length !== 0) {
            const edge = queue.shift();

            // to do later
            if (edge.location == targetNode) console.log('yes!');

            edge.children.forEach((child) => {
                queue.push(child);
            });
        }
    }

    knightMoves(start, end) {
        // get shortest path
        const tree = new Tree(start, this.adjacencyList);
        tree.buildTree();

        this.findPath(tree.root, end);
    }
}

class Node {
    constructor(location) {
        this.location = location;
        this.children = [];
    }
}

class Tree {
    constructor(root, adjacencyList) {
        this.root = new Node(root);
        this.adjacencyList = adjacencyList;
    }

    buildTree(currentNode = this.root, limit = 0) {
        // arbitrary number to keep recursion from getting too long!
        // but this takes a lot of time complexity 
        if (limit > 5) return;

        const index = (currentNode.location[0] * 8) + (currentNode.location[1] % 8);
        
        this.adjacencyList[index].forEach((edge) => {
            currentNode.children.push(new Node(edge));
        });

        currentNode.children.forEach((child) => {
            this.buildTree(child, limit + 1);
        })
    }
}

const board = new Board();
board.createAdjacencyList();
board.knightMoves([0, 0], [3, 3]);