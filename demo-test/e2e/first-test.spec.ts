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