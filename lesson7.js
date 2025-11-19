// Loops

/**
 * Explanation:
 * statement1, for initial statement. What we want to start the loop with
 * statement2, for define the condition of how long do we want to run our loop and when we want to stop
 * statement3, for what we need to do after each cycle of loop
 */

// format  loop
// for (statement1; statement2; statement3) {

// }

//Example loop: for i loop
for (let i = 0; i < 5; i = i + 1) {
  console.log("Hello World " + i);
}

//Example loop: for of loop
var cars = ["Volvo", "Toyota", "Tesla"];
for (let car of cars) {
  console.log(car);
  //if you want break a loop, you can do this. loops can break after found the string of Toyota
  if (car == "Toyota") {
    break;
  }
}

//Example loop: using ES6 syntax
cars.forEach((car) => {
  console.log(car);
});
