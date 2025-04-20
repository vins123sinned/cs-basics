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

    get(key) {
        const hashCode = this.hash(key);

        let currentNode = this.array[hashCode];

        if (!currentNode) return null;
        if (currentNode.next === null) return currentNode.value;

        while (currentNode !== null) {
            if (currentNode.key === key) return currentNode.value;

            currentNode = currentNode.next;
        }

        // just in case!
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);

        let currentNode = this.array[hashCode];

        if (!currentNode) return false;

        while (currentNode !== null) {
            if (currentNode.key === key) return true;

            currentNode = currentNode.next;
        }

        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);

        let currentNode = this.array[hashCode];

        if (!currentNode) return false;

        while (currentNode !== null) {
            if (!currentNode.next) {
                // only one element in the bucket
                if (currentNode.key === key) {
                    // also could do null
                    this.array[hashCode] = currentNode.next;
                    return true;
                }

                return false;
            }

            // first element (runs before the one element conditional!)
            if (currentNode.key === key) {
                this.array[hashCode] = currentNode.next;
                return true;
            }

            if (currentNode.next.key === key) {
                currentNode.next = currentNode.next.next;
                return true;
            }
        
            currentNode = currentNode.next;
        }
    }

    length() {
        let total = 0;

        this.array.forEach((bucket) => {
            let currentNode = bucket;
            
            while (currentNode !== null) {
                total++;
                currentNode = currentNode.next;
            }
        });

        return total;
    }

    clear() {
        this.array = [];
    }

    keys() {
        let keys = [];

        this.array.forEach((bucket) => {
            let currentNode = bucket;

            while (currentNode !== null) {
                keys.push(currentNode.key);
                currentNode = currentNode.next;
            }
        });

        return keys;
    }

    values() {
        let values = [];

        this.array.forEach((bucket) => {
            let currentNode = bucket;

            while (currentNode !== null) {
                values.push(currentNode.value);
                currentNode = currentNode.next;
            }
        });

        return values;
    }

    entries() {
        let entries = [];

        this.array.forEach((bucket) => {
            let currentNode = bucket;

            while (currentNode !== null) {
                entries.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        });

        return entries;
    }
}

const people = new HashMap(16, 0.8);

people.set('Sita', 'Olda valueismo!');
people.set('Rama', 'test');
people.set('Sita', 'New valueismo!');
people.set('Carlos', 'Test 2')

//console.log(people);
console.log(people.entries());