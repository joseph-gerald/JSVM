function greet(name) {
    console.log("Hello " + name)
}

greet("Bob")
greet("John")

window.greet = greet;