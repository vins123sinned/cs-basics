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

    insertAt(value, index) {
        if (index === 0) return this.prepend(value);

        let currentNode = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            if (currentNode === null) return console.log('Cannot insert!');
            currentNode = currentNode.next;
        }

        if (currentNode.next === null) return this.append(value);

        const node = new Node(value, currentNode.next.next);
        currentNode.next = node;
    }

    removeAt(index) {
        //account for first and last element (head and tail);
        if (index === 0) return this.head = this.head.next;

        let currentNode = this.head;

        for (let i = 0; i < index - 1; i++) {
            if (currentNode === null) return console.log('Cannot remove!');
            currentNode = currentNode.next;
        }

        console.log(currentNode);
        if (currentNode.next === null) return currentNode.next = null;

        currentNode.next = currentNode.next.next;
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

console.log(list.removeAt(6));
console.log(list.toString());