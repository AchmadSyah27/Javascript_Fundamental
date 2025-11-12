//Relational or comparison operators

// > - more than
// < - less than
// >= - more than equal
// <= - less than equal

//sample of more than
var sampleMoreThan = 15 > 5;
console.log(sampleMoreThan);

//sample of less than
var sampLessThan = 5 < 15;
console.log(sampLessThan);

//sample more than equal
var moreThanEqual = 10 >= 5;
console.log(moreThanEqual);
var moreThanEqual2 = 10 >= 10;
console.log(moreThanEqual2);

//sample less than equal
var lessThanEqual = 5 <= 10;
console.log(lessThanEqual);
var lessThanEqual2 = 10 <= 10;
console.log(lessThanEqual2);

//equalit operator
var x = 1;
console.log(x == "1"); //this a lose comparison, result can showing true cause do not compare data type. Just comparing the value it self
console.log(x === "1"); //this a strict comparison, result can showing false cause the sign with triple equals is not only comparing the value but also checkin the data type
