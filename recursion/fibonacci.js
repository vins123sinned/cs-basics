function fibs(number) {
    let array = [0, 1];

    while (array.length < number) {
        array.push(array[array.length - 1] + array[array.length - 2]);
    }

    return array;
}

// set array to [0, 1, 1] to prevent any unexpected buds
function fibsRec(number, array = [0, 1, 1]) {
    if (array.length === number) return array;

    array.push(array[array.length - 1] + array[array.length - 2]);

    return fibsRec(number, array);
}

console.log(fibsRec(8));