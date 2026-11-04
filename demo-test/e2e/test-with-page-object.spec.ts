import { test } from "@playwright/test";
import { PageManager } from "../pages-objects/page-manager";

test.beforeEach(async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/");
});

test('Navigate to form layouts page', async ({page}) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.ToasterPage()
    await pom.navigateTo.TooltipPage()
    await pom.navigateTo.SmartTablePage()
})

test('Parameterized page object methods', async ({page}) => {
    const pom = new PageManager(page)

    //Melakukan panggil helper methode form formLayoutsPage
    //setelah berhasil ke halaman layout page, submit data di using the grid form
    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm('andrian.soedjadi18@gmail.com', 'Pass123', 'Option 1')
    await pom.formLayoutsPage.submitInlineForm('Andrian Soedjadi', 'Andrian.Soedjadi18@gmail.com', true)
    await pom.navigateTo.datePickerPage()
    //Melakukan panggil helper methode datepickerPage
    await pom.datepickerPage.selectCommonDatepickerDateFromToday(5)
    await pom.datepickerPage.selectDatePickerWithRangeFromToday(1, 50)
})