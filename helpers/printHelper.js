export function printAge(age) {
    console.log(`The age is: ${age}`);
}

//export bisa dilakukan pemanggilan dari sini
class CustomerDetails {
   
    printFirstName(firstName) {
        console.log(firstName);
    }

    printLastName(lastName) {
        console.log(lastName);
    }
}    

//atau bisa juga diexport setelah class, syaratnya text export yang diatas dipindah ke bawah
export const customerDetails = new CustomerDetails();