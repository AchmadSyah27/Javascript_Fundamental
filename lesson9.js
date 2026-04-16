import { customerDetails } from "./helpers/printHelper.js";

//kalau export class dilakukan setelah class, maka pemanggilan variabelnya bisa di disable. kalau export dilakukan 
//sebelum class, maka pemanggilan variablenya harus dilakukan disini
//var customerDetails = new CustomerDetails()
customerDetails.printFirstName("Andrian");
customerDetails.printLastName("Soedjadi");