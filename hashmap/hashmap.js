class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = 0;
        this.loadFactor = 0.8;
        this.array = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }
}

const people = new HashMap();
console.log(people);