import {test} from '@playwright/test';

test('First Test', async({ page }) => { 
    //Menuju ke halaman web
    await page.goto('https://automationexercise.com/');

    //Memastikan terdapat button 'Signup / Login' pada halaman web
    await page.getByRole('link', { name: 'Signup / Login' }).isVisible();

    //Melakukan click pada button 'Signup / Login'
    await page.getByRole('link', { name: 'Signup / Login' }).click();
})

//Contoh bentuk dalam test suite
// test.describe('Test Suite', () => {

//     test('Test Pertama', async({ page }) => {
//         //Test Steps
//     })

//     test('Test Kedua', async({ page }) => {
//         //Test Steps
//     })

//     test('Test Ketiga', async({ page }) => {
//         //Test Steps
//     })
// })