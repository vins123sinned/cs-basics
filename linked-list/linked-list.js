class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        if (this.head === null) {
            this.head = new Node(value, null);
            this.tail = this.head;
            return;
        }

        const node = new Node(value, null);

        this.tail.next = node;
        this.tail = node;
    }

    prepend(value) {
        const node = new Node(value, this.head);
        this.head = node;
    }

    size() {
        let total = 0;
        let currentNode = this.head;

        while (currentNode !== null) {
            total++;
            currentNode = currentNode.next;
        }

        return total;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    at(index) {
        let currentNode = this.head;

        for (let i = 0; i < index; i++) {
            if (currentNode === null) return console.log('Index exceeds list size!');
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    pop() {
        // could also use doubly linked list here!
        let currentNode = this.head;

        while (currentNode.next !== this.tail) {
            currentNode = currentNode.next;
        }

        currentNode.next = null;
        this.tail = currentNode;
    }

    contains(value) {
        let currentNode = this.head;
        
        while (currentNode.value !== value) {
            currentNode = currentNode.next;
            if (currentNode === null) return false;
        }

        return true;
    }

    find(value) {
        let currentNode = this.head;
        let index = 0;

        while (currentNode.value !== value) {
            index++;
            currentNode = currentNode.next;
            if (currentNode === null) return null;
        }

        return index;
    }

    toString() {
        let currentNode = this.head;
        let string = '';

        while (currentNode !== null) {
            string += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }

        string += 'null';
        return string;
    }
}

class Node {
    constructor(value, nextNode) {
        this.value = value,
        this.next = nextNode
    }
}

const list = new LinkedList();

list.append("dog");
list.prepend("t-rex");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());