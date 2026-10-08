import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("https://playground.bondaracademy.com/");
});

test.describe("Form Layout Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByText("Forms").click();
		await page.getByText("Form Layouts").click();
	});

	test("Input fields", async ({ page }) => {
		const usingTheGridEmailInput = page
			.locator("nb-card", { hasText: "Using the Grid" })
			.getByRole("textbox", { name: "Email" });

		//Melakukan input ke dalam textbox
		await usingTheGridEmailInput.fill("andrian.soedjadi18@gmail.com");

		//Melakukan clear input
		await usingTheGridEmailInput.clear();

		//Melakukan input seperti mengetik di keyboard
		await usingTheGridEmailInput.pressSequentially(
			"andrian.soedjadi18@gmail.com",
			{ delay: 50 },
		);

		//extract the value
		const inputValue = await usingTheGridEmailInput.inputValue();

		//assertion
		await expect(usingTheGridEmailInput).toHaveValue(
			"andrian.soedjadi18@gmail.com",
		);

		//assertion bisa menggunakan regex
		await expect(usingTheGridEmailInput).toHaveValue(/gmail.com/);

		test("Radio button", async ({ page }) => {
			const usingTheGridForm = page.locator("nb-card", {
				hasText: "Using the Grid",
			});

			//Melakukan klik pada radio button option 1
			await usingTheGridForm.getByLabel("Option 1").check({ force: true });

			//Melakukan klik pada radio button option 2
			await usingTheGridForm
				.getByLabel("radio", { name: "Option 2" })
				.check({ force: true });

			//Sample cara umum untuk verify sebuah radio button sudah tercheck atau belum tapi bukan cara yang benar karena tidak mengembalikan nilai true atau false
			const radioStatus = await usingTheGridForm
				.getByRole("radio", { name: "Option 2" })
				.isChecked();
			expect(radioStatus).toBeTruthy();

			//Cara untuk verify yang benar untuk verifikasi sebuah radio button sudah tercheck atau belum dan mengembalikan nilai true atau false
			await expect(
				usingTheGridForm.getByRole("radio", { name: "Option 2" }),
			).toBeChecked();
			await expect(
				usingTheGridForm.getByRole("radio", { name: "Option 1" }),
			).not.toBeChecked();
		});
	});

	test("Checkbox", async ({ page }) => {
		await page.getByText("Modal & Overlays").click();
		await page.getByText("Toastr").click();

		//Memastikan checkbox "Hide on click" sudah ter-checklist
		await page
			.getByRole("checkbox", { name: "Hide on click" })
			.check({ force: true });

		//Membuat case dimana assertion memeriksa dari yang awalnya checkbox "Hide on click" sudah ter-checklist
		//Maka akan di-uncheck terlebih dahulu
		const allBoxes = page.getByRole("checkbox");
		for (const box of await allBoxes.all()) {
			await box.uncheck({ force: true });
			await expect(box).not.toBeChecked();
		}

		//Lalu buat kondisi case sebaliknya, dimana checkbox "Hide on click" belum ter-checklist,
		// maka akan di-checklist terlebih dahulu
		const allBoxes1 = page.getByRole("checkbox");
		for (const box of await allBoxes1.all()) {
			await box.check({ force: true });
			await expect(box).toBeChecked();
		}
	});

	test("Lists and dropdowns", async ({ page }) => {
		await page.getByText("Modal & Overlays").click();
		await page.getByText("Toastr").click();

		//Melakukan klik pada dropdown list Toast type (Element ini adalah standart dropdown HTML)
		await page
			.locator(".form-group", { hasText: "Toast type" })
			.getByRole("combobox")
			.selectOption("info");
		//Melakukan assertion untuk memastikan dropdown list Toast type sudah terpilih option info
		await expect(page.getByRole("combobox")).toHaveValue("info");

		//Dibawah ini adalah contoh untuk dropdown list yang custom dropdown,
		//dropdown list yang dibuat menggunakan library tertentu (contoh: di dropdown Position)
		await page
			.locator(".form-group", { hasText: "Position:" })
			.locator("nb-select")
			.click();
		//Cara pertama
		// await page.getByRole("list").getByText("bottom-end").click();
		//Cara kedua
		await page.locator("nb-option", { hasText: "bottom-end" }).click();
		//Setelah itu kita tambahkan untuk validasi melalui dropdown list yang dipilih
		await expect(
			page
				.locator(".form-group", { hasText: "Position:" })
				.locator("nb-select"),
		).toHaveText("bottom-end");

		//case jika kita perlu looping untuk select dari semua isi yang ada di dropdown list Position
		const positionDropDownField = page
			.locator(".form-group", { hasText: "Position:" })
			.locator("nb-select");
		await positionDropDownField.click();
		const allListValues = await page.locator("nb-option").allTextContents();
		for (const listValue of allListValues) {
			await page.locator("nb-option", { hasText: listValue }).click();
			await expect(positionDropDownField).toHaveText(listValue);
			await positionDropDownField.click();
		}
	});

    test("Tooltips", async ({ page }) => {
        await page.getByText("Modal & Overlays").click();
		await page.getByText("Tooltip").click();

        //Melakukan hover pada tombol tooltip dan verify tooltop yang muncul sudah sesuai
        await page.getByRole("button", { name: "Top" }).hover();
        await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
    })

    test("Dialog box", async ({ page }) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        //Case dibawah ini untuk melakukan hapus satu data di halaman smart table lalu
        //Accept dialog box yang model-nya bawaan dari browser
        //Pendekatannya memanggil callback function 
        page.on('dialog', dialog => {
            //Memastikan dialog box tampil
            expect(dialog.message()).toEqual('Are you sure you want to delete?')

            //Melakukan accept pada dialog box yang tampil dari model bawaan browser
            dialog.accept()
        })

        //Melakukan klik pada icon delete untuk menghapus data
        await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()

        //Memastikan data yang sudah dihapus tidak tampil di halaman smart table
        await expect(page.locator('tr', {hasText: 'mdo@gmail.com'})).not.toBeVisible()
    })
});
