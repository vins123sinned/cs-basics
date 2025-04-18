function mergeSort(array) {
    if (array.length === 1) return;

    const half = Math.ceil(array.length / 2);
    const leftSide = array.slice(0, half);
    const rightSide = array.slice(half);

    
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));