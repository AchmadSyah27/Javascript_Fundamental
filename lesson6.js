// Conditional statement
// if (condition) {
//   //execute some code here
// } else {
//   //execute some code here
// }

/**
 * example:
 * If hour between 6 and 12 print "Good Morning"
 * If hour between 12 and 18 print "Good Afternoon"
 * Otherwise: Good evening
 */

var hour = 18;

// if (hour >= 6 && hour <= 12) {
//   console.log("Good Morning");
// } else if (hour >= 12 && hour < 18) {
//   console.log("Good Afternoon");
// } else {
//   console.log("Good Evening");
// }

/**
 * example 2:
 * create condition for pedestrian get a Drive License
 */

var ageIsMoreThanEighteen = false;
var isUSCitizen = true;

if (ageIsMoreThanEighteen && isUSCitizen) {
  console.log("Customer is eligible for Driver License");
} else {
  console.log("Customer is NOT eligible for Driver License");
}
