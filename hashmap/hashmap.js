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
                    currentNode.value = value;
                    break;
                }

                // stop at tail node and set append
                if (currentNode.next === null) {
                    currentNode.next = {
                        key,
                        value,
                        next: null,
                    }
                    break;
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

        if (this.length() > (this.capacity * this.loadFactor)) {
            this.doubleCapacity();
        }
    }

    doubleCapacity() {
        this.capacity *= 2;

        const entries = this.entries();
        this.clear();

        entries.forEach((entry) => {
            this.set(entry[0], entry[1]);
        });
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

    clear(clear) {
        if (clear) this.capacity = 16;
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

const test = new HashMap(16, 0.75)

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.set('kite', 'red')
test.set('apple', 'green')

// this should increase the capacity!
test.set('vinson', 'big backed, but skinnying!');
console.log(test);

console.log(test.get('kite'));
console.log(test.remove('kite'));
console.log(test.length());
console.log(test.has('elephant'));
console.log(test.has('tree'));

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.capacity)
console.log(test.clear(true));