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

console.log(list);