
String.prototype.replaceAll = function(t,r){
    o = this;
    c = true;
    if(c==1){cs="g"}else{cs="gi"}var mp=new RegExp(t,cs);ns=o.replace(mp,r);return ns;
}
