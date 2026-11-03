import { Page,expect } from "@playwright/test";

export class DatepickerPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatepickerDateFromToday(daysFromToday: number){

        /**
         * Metode ini diambil dari file ui-component_integrated.spect.ts
         */
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
		await calendarInputField.click()

        //Menggunakan metode private selectDateFromCalendar
        const expectedDate = await this.selectDateFromCalendar(daysFromToday)
        await expect(calendarInputField).toHaveValue(expectedDate)
    }

    async selectDatePickerWithRangeFromToday(daysFromTodayStart: number, daysFromTodayEnd:number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
		await calendarInputField.click()

        /**
        * Dibawah ini kita gunakan kembali metode private selectDateFromCalendar
        * Hanya saja bedanya kita akan menyesuaikan fungsinya untuk select date dengan range
        */
        const expectedDateStart = await this.selectDateFromCalendar(daysFromTodayStart)
        const expectedDateEnd = await this.selectDateFromCalendar(daysFromTodayEnd)
        const expectedRangeDate = `${expectedDateStart} - ${expectedDateEnd}`
        await expect(calendarInputField).toHaveValue(expectedRangeDate)
    }

    private async selectDateFromCalendar(daysFromToday: number){
        const date = new Date()
		date.setDate(date.getDate()+daysFromToday)
		const expectedDay = date.getDate().toString()
		const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
		const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
		const expectedYear = date.getFullYear()
		const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

        let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
		const expectedMontAndYear = `${expectedMonthLong} ${expectedYear}`
		while(!currentMonthAndYear?.includes(expectedMontAndYear)){
			//kalau tanggal yang dipilih tidak ada
			//maka klik button next month pada calender yang sedang terbuka window-nya 
			await this.page.locator('.next-month').click()
			currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
		}

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click()
        return expectedDate
    }
}