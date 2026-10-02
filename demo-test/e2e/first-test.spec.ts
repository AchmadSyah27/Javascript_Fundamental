import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator Syntax Rule', async ({ page }) => {
    //Find by tag
    page.locator('input')

    //Find by id
    page.locator('#inputEmail1')

    //Find by class value
    page.locator('.shape-rectangle')

    //Find by any attribute
    page.locator('[placeholder="Email"]')

    //Find by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Find by several selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //Find by xpath (Not Recommended)
    page.locator('//*[@id="inputEmail1"]')

    //Find by partial text match
    page.locator(':text("Using")')

    //Find by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User-visible locators', async ({ page }) => {
    //Find by object type
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.getByRole('textbox', { name: 'Email' }).first().fill('test@example.com')

    await page.getByLabel('email').first().fill('test123@example.com')

    await page.getByPlaceholder('Jane Doe').first().fill('Artem Bondar')

    await page.getByText('Submit').first().click()

    await page.getByTestId('inputEmail1').fill('testandrian@example.com')

    await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click()

    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating  parent elements', async ({ page }) => {
    //await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click()

    //await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click()

    //await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click()

    // await page.locator('nb-card')
    // .filter({has: page.locator('nb-checkbox')})
    // .filter({hasText: 'Sign in'})
    // .getByLabel('Email')
    // .fill('andrian.soedjadi18@gmail.com')

    //Naik satu element
    await page.getByText('Using the Grid').locator('..').getByRole('button').click()
})