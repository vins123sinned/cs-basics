class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.array = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        // Check if there is an existing value in bucket
        if (this.array[hashCode]) {
            let currentNode = this.array[hashCode];

            while (currentNode !== null) {
                // Update key's value if applicable
                if (currentNode.key === key) {
                    return currentNode.value = value;
                }

                // stop at tail node and set append
                if (currentNode.next === null) {
                    return currentNode.next = {
                        key,
                        value,
                        next: null,
                    }
                };

                currentNode = currentNode.next;
            }
        } else {
            this.array[hashCode] = {
                key,
                value,
                next: null,
            };
        }
    }
}

const people = new HashMap(16, 0.8);

people.set('Sita', 'Olda valueismo!');
people.set('Rama', 'test');
people.set('Sita', 'New valueismo!');

console.log(people);