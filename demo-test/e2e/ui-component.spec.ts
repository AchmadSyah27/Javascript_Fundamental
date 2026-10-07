import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Form Layout Page',() => {
 
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', { name: 'Email' })
        
        //Melakukan input ke dalam textbox
        await usingTheGridEmailInput.fill('andrian.soedjadi18@gmail.com')

        //Melakukan clear input
        await usingTheGridEmailInput.clear()

        //Melakukan input seperti mengetik di keyboard
        await usingTheGridEmailInput.pressSequentially('andrian.soedjadi18@gmail.com', {delay: 50})

        //extract the value
        const inputValue = await usingTheGridEmailInput.inputValue()

        //assertion
        await expect(usingTheGridEmailInput).toHaveValue('andrian.soedjadi18@gmail.com')

        //assertion bisa menggunakan regex
        await expect(usingTheGridEmailInput).toHaveValue(/gmail.com/)
    })

    test('Radio button', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
    })
})