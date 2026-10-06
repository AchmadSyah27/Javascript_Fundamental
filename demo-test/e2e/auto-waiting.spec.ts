import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();
});

test('Auto waiting', async ({ page }) => {
    const dialogWithDelayform = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
    await dialogWithDelayform.getByRole('button', { name: '3 seconds' }).click()
    
    //sample dibawah ini tidak menunggu apa-apa jadi langsung failed
    const dialogContainer = page.locator('nb-dialog-container')
    // await dialogContainer.getByRole('button', { name: 'Ok' }).click()

    // const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent()
    const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents()
    expect(dialogHeaderText).toEqual('Friendly reminder')
})

test('Alternative waits', async ({ page }) => {
    const dialogWithDelayform = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
    await dialogWithDelayform.getByRole('button', { name: '3 seconds' }).click()
    const dialogContainer = page.locator('nb-dialog-container')

    //--wait for the element
    // await dialogContainer.waitFor()
    // await page.waitForSelector('nb-dialog-container')

    //--wait for API response
    // await page.waitForResponse('**/delay/*')

    //--wait for load state (Not recommended)
    // await page.waitForLoadState('networkidle')

    //--hardcode wait (jangan pernah digunakan karena kita tidak tahu berapa lama harus menunggu sampai element muncul)
    // await page.waitForTimeout(3500)
    
    // const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents()
    // expect(dialogHeaderText).toContain('Friendly reminder')

    //Cara lebih friendly dalam penggunaan wait
    await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder')
})