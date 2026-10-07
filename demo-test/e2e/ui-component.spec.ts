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
});
