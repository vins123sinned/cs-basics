class LinkedList {
    constructor() {
        this.head = null;
    }
}

class Node {
    constructor(value, nextNode) {
        this.value = value,
        this.next = nextNode
    }
}

const list = new LinkedList(1, 2, 3);
console.log(list);
const testNode = new Node(1, null);
console.log(testNode);