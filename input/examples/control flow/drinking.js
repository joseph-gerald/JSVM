let age = 1;
let text = "I am " + age + " years old"

console.log(text)
console.log("Hello | " + age)
console.log(text)

// Can drink in US
if (age > 20) {
    console.log("Yes")
} else if (age < 3) {
    console.warn("Baby")
} else {
    console.warn("Too Young")
}