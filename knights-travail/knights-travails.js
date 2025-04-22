// Create board data structure
class Board {
    constructor(height, length) {
        // height and length of board
        this.height = height;
        this.length = length;
    }

    createAdjacencyList() {
        // quadratic complexity
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.length; j++) {
                console.log([`${i}, ${j}`])
            }
        }
    }

    knightMoves(start, end) {
        // get shortest path
    }
}

const board = new Board(8, 8);
board.createAdjacencyList();