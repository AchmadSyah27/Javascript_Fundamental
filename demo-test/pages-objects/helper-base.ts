import { Page } from "@playwright/test";

export class HelperBase {
    protected readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    protected async getToastrMessage(){
        return "I'm cool toaster"
    }

}