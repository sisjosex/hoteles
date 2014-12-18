
function heapSize() {
    if (!performance.memory) {
        return('!!! performance.memory not supported !!!');
    }
    if (!performance.memory.usedJSHeapSize) {
        return('!!! performance.memory.usedJSHeapSize not supported !!!');
    }
    return Math.round(performance.memory.usedJSHeapSize / 10000, 2) / 100 + ' MB';
}


String.prototype.replaceAll = function(t,r){
    o = this;
    c = true;
    if(c==1){cs="g"}else{cs="gi"}var mp=new RegExp(t,cs);ns=o.replace(mp,r);return ns;
}
