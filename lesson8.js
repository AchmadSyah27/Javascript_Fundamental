//Declarative function
//Declarative function, bisa dipanggil sebelum dideklarasikan
//helloOne(); <-- bisa langsung ketik disini
function helloOne() {
    console.log("Hello One");
}
helloOne();

//Anonymmous function
//Anonymous function, tidak bisa dipanggil sebelum dideklarasikan, karena ketika kita run akan muncul error
var helloTwo = function() {
    console.log("Hello Two");
}
helloTwo();

//ES6 function syntax or Arrow function
var helloThree = () => {
    console.log("Hello Three");
}
helloThree();

//Function with argument
function printName(name, lastName) {
    console.log("Hello " + name + " " + lastName);
}
printName("Andrian", "Soedjadi");

//Function with return value
function pengkali2(angka) {
    var hasil = angka * 2;
    return hasil;
}
var hasilPengkalian = pengkali2(5);
console.log(hasilPengkalian);

//Importing a function from another file
import { printAge } from "./helpers/printHelper.js";
printAge(25);

//Import everything
import * as printHelper from "./helpers/printHelper.js";
printHelper.printAge(30);