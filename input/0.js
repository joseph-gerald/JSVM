function add(o, n) {
    return o + n
}

function mul(o, n) {
    return o * n
}

function sub(o, n) {
    return o - n
}
const sum = add(1, 4);
console.log(sum);
const product = mul(add(4, 2), sub(3, 1));
console.log(product);