import { expect, test } from "@playwright/test";
import { NavigationPage } from "../pages-objects/navigation-page";
import { FormLayoutsPage } from "../pages-objects/form-layouts-page";

test.beforeEach(async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/");
});

test('Navigate to form layouts page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.ToasterPage()
    await navigateTo.TooltipPage()
    await navigateTo.SmartTablePage()
})

test('Parameterized page object methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)

    //Melakukan panggil helper methode form formLayoutsPage
    //setelah berhasil ke halaman layout page, submit data di using the grid form
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridForm('andrian.soedjadi18@gmail.com', 'Pass123', 'Option 1')
})