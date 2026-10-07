import { expect, test } from '@playwright/test';

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
    //Melakukan klik pada button sign in yang berada di dalam card dengan text "Using the Grid"
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click()

    await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click()

    await page.locator('nb-card')
    .filter({has: page.locator('nb-checkbox')})
    .filter({hasText: 'Sign in'})
    .getByLabel('Email')
    .fill('andrian.soedjadi18@gmail.com')

    //Naik satu element menggunakan xpath locator ('..')
    await page.getByText('Using the Grid').locator('..').getByRole('button').click()
})

test('await Reusing locators', async ({ page }) => {
    await page.locator('nb-card', {hasText: 'Basic form'}).getByLabel('Email').fill('andrian.soedjadi18@gmail.com')
    await page.locator('nb-card', {hasText: 'Basic form'}).getByLabel('Password').fill('Playwright99')
    await page.locator('nb-card', {hasText: 'Basic form'}).locator('nb-checkbox').click()
    await page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button').click()
})

test('await Reusing locators - Evo', async ({ page }) => {
    const basicForm = await page.locator('nb-card', {hasText: 'Basic form'})
    const emailInputField = await basicForm.getByLabel('Email')

    await basicForm.getByLabel('Email').fill('andrian.soedjadi18@gmail.com')
    await basicForm.getByLabel('Password').fill('Playwright99')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailInputField).toHaveValue('andrian.soedjadi18@gmail.com')
})

test('Extract value', async ({ page }) => {
    //Extracting text
    const basicForm = page.locator('nb-card', {hasText: 'Basic form'})
    const submitButtonText = await basicForm.getByRole('button').textContent()
    expect(submitButtonText).toEqual('Submit')

    //Extracting multiple text values
    const allRadioButtons = await page.locator('nb-radio').allTextContents()
    console.log(allRadioButtons)

    //Validating text values need comment above section before run
    const ValidatingRadioButtons = await page.locator('nb-radio').allTextContents()
    expect(ValidatingRadioButtons).toContain('Option 1')

    //Extract input field value
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('andrian.soedjadi18@gmail.com')
    const emailFieldValue = await emailField.inputValue()
    console.log(emailFieldValue)

    //Extract attribute value placeholder
    const emailPlaceholder = await emailField.getAttribute('placeholder')
    console.log(emailPlaceholder)
})

test('Assertions', async ({ page }) => {
    const basicForm = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button')

    //Generic assertion
    const value = 5
    expect(value).toEqual(5)

    const submitButtonText = await basicForm.textContent()
    expect(submitButtonText).toEqual('Submit')


    //Locator assertion, kalau tidak ketemu statusnya akan langsung failed
    await expect(basicForm).toHaveText('Submit')

    //Soft assertion, kalau tidak ketemu statusnya akan tetap pass
    await expect.soft(basicForm).toHaveText('Submit')
    await basicForm.click()
})

test('Generated Test', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    await page.getByRole('textbox', { name: 'Jane Doe' }).click();
    await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Andrian soedjadi');
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').click();
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('andrian.soedjadi18@gmail.com');
    await page.locator('.custom-checkbox').first().click();
    await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByRole('button').click();
    await page.close();
})