function mergeSort(array) {
    if (array.length <= 1) return array;

    const half = Math.ceil(array.length / 2);
    const firstHalf = array.slice(0, half);
    const secondHalf = array.slice(half);

    const sortedLeft = mergeSort(firstHalf);
    const sortedRight = mergeSort(secondHalf);

    return merge(sortedLeft, sortedRight);
}

function merge(array1, array2) {
    let mergedArray = [];
    let array1Index = 0;
    let array2Index = 0;

    while (array1Index < array1.length && array2Index < array2.length) {
        if (array1[array1Index] <= array2[array2Index]) {
            mergedArray.push(array1[array1Index]);
            array1Index++;
        } else if (array2[array2Index] < array1[array1Index]) {
            mergedArray.push(array2[array2Index]);
            array2Index++;
        }
    }

    for (; array1Index < array1.length; array1Index++) {
        mergedArray.push(array1[array1Index]);
    }
    for (; array2Index < array2.length; array2Index++) {
        mergedArray.push(array2[array2Index]);
    }

    return mergedArray;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));