const xorKey = 0x55;

function greet(name) {
    console.log(xorKey)
    console.log("Hello " + name)
}

greet("Bob")
greet("John")

window.greet = greet; // @jsvm/function