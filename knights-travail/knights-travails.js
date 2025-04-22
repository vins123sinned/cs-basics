// Create board data structure
class Board {
    constructor() {
        this.height = 8;
        this.length = 8;
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

        return array;
    }

    knightMoves(start, end) {
        // get shortest path
    }
}

const board = new Board();
const array = board.createAdjacencyList();
console.log(array);