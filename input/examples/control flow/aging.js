let age = 1;

while (age < 100) {
    const canDrink = age > 20;
    console.log("Age: " + age);

    if(age == 99) {
        console.log("Almost dead")
    }

    // Can drink in USA
    if(canDrink) {
        console.log("You can drink!");
    } else {
        console.log("You not can drink!");
    }
    age++;
}

console.log("Dead")