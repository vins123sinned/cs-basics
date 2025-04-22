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

            if (edge.location.toString() === targetNode.toString()) return edge;

            edge.children.forEach((child) => {
                queue.push(child);
            });
        }
    }

    printPath(path) {
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        path.forEach((move) => {
            console.log(move);
        })
    }

    knightMoves(start, end) {
        if (!this.checkLocation(start[0], start[1]) ||
            !this.checkLocation(end[0], end[1])) return console.log('Invalid Inputs!');

        // get shortest path
        const tree = new Tree(start, this.adjacencyList);
        tree.buildTree();

        let path = this.findPath(tree.root, end);
        const pathArray = [];

        while (path.parent !== null) {
            pathArray.push(path.location);
            path = path.parent;
        }

        pathArray.push(start);
        this.printPath(pathArray.reverse());
    }
}

class Node {
    constructor(location, parent) {
        this.location = location;
        this.parent = parent;
        this.children = [];
    }
}

class Tree {
    constructor(root, adjacencyList) {
        this.root = new Node(root, null);
        this.adjacencyList = adjacencyList;
    }

    buildTree(currentNode = this.root, limit = 0) {
        // arbitrary number to keep recursion from getting too long!
        // but this takes a lot of time complexity 
        if (limit > 5) return;

        const index = (currentNode.location[0] * 8) + currentNode.location[1] % 8;
        
        this.adjacencyList[index].forEach((edge) => {
            currentNode.children.push(new Node(edge, currentNode));
        });

        currentNode.children.forEach((child) => {
            this.buildTree(child, limit + 1);
        })
    }
}

const board = new Board();
board.createAdjacencyList();
board.knightMoves([3, 3], [4, 3]);