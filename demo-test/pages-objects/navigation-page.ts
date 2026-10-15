import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async formLayoutsPage(){
        //setelah pembuatan helper metode selectGroupMenuItem selesai, kita bisa panggil ke sini
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
		await this.page.getByText('Datepicker').click()
    }

    async ToasterPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
		await this.page.getByText("Toastr").click();
    }

    async TooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
		await this.page.getByText("Tooltip").click();
    }

    async SmartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    //Karna async diatas tidak stabil, maka perlu buat helper metode baru
    //Supaya run test case-nya lebih stabil
    //Di setiap menu di halaman utama, yang membedakan menu terbuka atau tidaknya melalui attribute aria-expanded
    private async selectGroupMenuItem(groupMenuTitle: string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        //Di bawah ini menambahkan kondisi, jika menu yang ada dihalaman beranda masih tertutup
        //maka dari menu title(yang ditampung pada variable groupMenuItem) akan melakukan klik di menu tersebut
        if (expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}