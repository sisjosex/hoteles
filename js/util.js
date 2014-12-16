
function heapSize() {
    if (!performance.memory) {
        return('!!! performance.memory not supported !!!');
    }
    if (!performance.memory.usedJSHeapSize) {
        return('!!! performance.memory.usedJSHeapSize not supported !!!');
    }
    return Math.round(performance.memory.usedJSHeapSize / 10000, 2) / 100 + ' MB';
}