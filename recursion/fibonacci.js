function fibs(number) {
    let array = [0, 1];

    while (array.length < number) {
        array.push(array[array.length - 1] + array[array.length - 2])
    }

    return array;
}

console.log(fibs(15))