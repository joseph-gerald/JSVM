
function add(a, b) {
    console.log("Adding",a,b)
    return a + b;
};

function mul(a, b) {
    console.log("Multiplying",a,b)
    return a * b;
};

function sub(a, b) {
    console.log("Subtracting",a,b)
    return a - b;
};
const sum = add(1,4);
console.log(sum)
const product = mul(add(4,2),sub(3,1));
console.log(product)