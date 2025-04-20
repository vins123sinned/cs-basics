class HashSet {
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

    set(key) {
        const hashCode = this.hash(key);

        // Check if there is an existing value in bucket
        if (this.array[hashCode]) {
            let currentNode = this.array[hashCode];

            while (currentNode !== null) {
                if (currentNode.key === key) return console.log('Key already exists!');

                // stop at tail node and set append
                if (currentNode.next === null) {
                    currentNode.next = {
                        key,
                        next: null,
                    }
                    break;
                };

                currentNode = currentNode.next;
            }
        } else {
            this.array[hashCode] = {
                key,
                next: null,
            };
        }

        if (this.length() > (this.capacity * this.loadFactor)) {
            this.doubleCapacity();
        }
    }

    doubleCapacity() {
        this.capacity *= 2;

        const keys = this.keys();
        this.clear();

        keys.forEach((key) => {
            this.set(key);
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
}

const set = new HashSet(16, 0.8);

set.set('Invincible');
set.set('Full Metal Alchemist');
set.set('Dexter');
set.set('Game of Thrones');
set.set('The Hunger Games');
set.set('Pokemon');
set.set('Naruto');
set.set('Severance');
set.set('Harry Potter');
set.set('Attack on Titan');
set.set('National Basketball Association');
set.set('National Football League');
set.set('YouTube');

set.remove('Game of Thrones');
set.set('Severance');

console.log(set.remove('National Basketball Association'));
console.log(set.has('YouTube'));
console.log(set.length());
console.log(set.keys());

console.log(set);
set.clear(true);
console.log(set);
