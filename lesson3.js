//Object
var customer = {
  firstName: "Achmad",
  LastName: "Syah",
  car: ["Volvo", "Toyota", "Tesla"],
};
console.log(customer);
//if you need just one of value you can write this
console.log(customer.firstName);
console.log(customer.LastName);

//using dot notation
customer.firstName = "Andrian";
console.log(customer.firstName);

//Bracker notation
customer["LastName"] = "Soedjadi";
console.log(customer.LastName);
console.log(`${customer.firstName} ${customer.LastName}`);

//Array
var car = ["Volvo", "Toyota", "Tesla"];
car[0] = "Daihatsu";
console.log(car[0]);
console.log(customer.car[0]);
