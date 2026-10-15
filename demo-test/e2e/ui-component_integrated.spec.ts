import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("https://playground.bondaracademy.com/");
});

test.describe("Form Layout Page", () => {
	//Kalau mau jalanin test sliders, script before each harus di comment dulu sebelum run
	// test.beforeEach(async ({ page }) => {
	// 	await page.getByText("Forms").click();
	// 	await page.getByText("Form Layouts").click();
	// });

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
        

        //Melakukan hover pada tombol tooltip dan verify tooltop yang muncul sudah sesuai
        await page.getByRole("button", { name: "Top" }).hover();
        await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
    })

    test("Dialog box", async ({ page }) => {
        

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

    test("Web tables", async ({ page }) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        //Cara 1: handle table di halaman web
        //Inisiasi data yang di ubah dengan alamat email twitter@outlook.com
        const tableRowByEmail = page.getByRole('row', {name: 'twitter@outlook.com'})

        //Melakukan klik icon edit
        await tableRowByEmail.locator('.nb-edit').click()

        //Ganti inputan dengan ubah age menjadi 35
        await tableRowByEmail.getByPlaceholder('Age').fill('35')

        //Melakukan klik pada icon checklist untuk menyimpan perubahan
        await tableRowByEmail.locator('.nb-checkmark').click()

        //Memastikan table age sudah berubah sesuai inputan
        await expect(tableRowByEmail.locator('td').last()).toHaveText('35')


		//Cara 2: get row by specific coloumn value
		const tableRowById = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')})
		await tableRowById.locator('.nb-edit').click()
		await page.locator('tbody').getByPlaceholder('E-mail').fill('test@test.com')
		await page.locator('tbody').locator('.nb-checkmark').click()
		await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com')

		//Cara 3: loop through table rows
		//untuk menghandle search data di kolom di sebuah halaman
		const ages = ["20", "30", "40", "200"]

		for (let age of ages){
			await page.getByPlaceholder('Age').fill(age)

			if(age == "200"){
				await expect(page.locator('tbody')).toContainText('No data found')
			}else{
				await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age)
				const allTableRows = await page.locator('tbody tr').all()
				for( let row of allTableRows){
					await expect(row.locator('td').last()).toHaveText(age)
				}
			}
		}

	})

	test('Date picker', async ({page}) => {
		

		const calendarInputField = page.getByPlaceholder('Form Picker')
		await calendarInputField.click()

		//cara 1: untuk memilih tanggal
		// await page.locator('.day-cell:not(.bounding-month)').getByText('15').click()

		//cara 2: ketika element tanggal yang dipilih selain dari element tanggal 15
		// await page.locator('.day-cell:not(.bounding-month)').getByText('2',{exact: true}).click()

		//Lanjut, untuk verifikasi tanggal yang sudah di pilih
		// await expect(calendarInputField).toHaveValue('Oct 2, 2026')

		//Cara 3: handle tanggal dynamic
		const date = new Date()
		date.setDate(date.getDate()+5)
		const expectedDay = date.getDate().toString()
		const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
		const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
		const expectedYear = date.getFullYear()
		const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

		//Lanjut verifikasi untuk tanggal dynamic yang di set
		// await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay,{exact: true}).click()
		// await expect(calendarInputField).toHaveValue(expectedDate)

		//Melakukan pilih tanggal, jika tanggal yang dipilih diluar dari bulan tersebut
		let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
		const expectedMontAndYear = `${expectedMonthLong} ${expectedYear}`
		while(!currentMonthAndYear?.includes(expectedMontAndYear)){
			//kalau tanggal yang dipilih tidak ada
			//maka klik button next month pada calender yang sedang terbuka window-nya 
			await page.locator('.next-month').click()
			currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
		}
		//Lanjut verifikasi untuk case tanggal dynamic yang di set jika
		//tanggal yang dipilih berada di bulan yang berbeda
		await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay,{exact: true}).click()
		await expect(calendarInputField).toHaveValue(expectedDate)
	})

	test('Sliders', async ({page}) => {
		//Cara pertama jika ada slider pada web aplikasi
		//jika ingin running cara kedua, cara pertama harus di comment dulu
		// const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
		//Melakukan callback
		// await tempGauge.evaluate( element => {
		// 	element.setAttribute('cx', '232.630')
		// 	element.setAttribute('cy', '232.630')
		// })
		//Lalu trigger supaya ke klik dan value-nya ter-setup
		// await tempGauge.click()

		//Cara kedua, dengan gerakan mouse
		//dengan mendapatkan luas value dari persegi temperature lalu masukkan ke variable x dan y
		const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
		await tempBox.scrollIntoViewIfNeeded()

		const box = await tempBox.boundingBox()
		const x = box?.x + box?.width /2
		const y = box?.y + box?.height /2
		await page.mouse.move(x, y)
		await page.mouse.down()
		await page.mouse.move(x+100, y) //gerak mouse ke kanan
		await page.mouse.move(x+100, y+100) //gerak mouse ke kanan
		await page.mouse.up()
		//memastikan nilai setelah geser temperature
		await expect(tempBox).toContainText('30')
	})

	test('Iframe', async ({page}) => {
		await page.getByText('Modal & Overlays').click()
		await page.getByText('Dialog').click()

		//Melakukan interaksi dengan iFrame
		//dengan cara attribute iFrame-nya kita temukan dulu lalu tentukan action apa yang akan kita lakukan berikutnya
		const frameLocator = page.frameLocator('[data-cy="esc-close-iframe"]')

		//action selanjutnya klik button 'Open Dialog with esc close'
		await frameLocator.getByRole('button', {name: 'Open Dialog with esc close'}).click()
	})

	test('Drag & Drop', async ({page}) => {
		await page.getByText('Extra Components').click()
		await page.getByText('Drag & Drop').click()

		//Melakukan drag & drop, cara pertama dengan menggunakan perintah dragTo
		await page.getByText('Clean my room').dragTo(page.locator('#drop-list'))

		//Cara kedua, 
		await page.getByText('Get groceries').hover()
		await page.mouse.down()
		await page.locator('#drop-list').hover()
		await page.mouse.up()
	})
});
