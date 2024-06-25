const xorKey = 0x55;

function greet(name) {
    console.log("Hello " + name)
}

window.greet = greet; // @jsvm/function

greet("Test")
greet("ASDF")