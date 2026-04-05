import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Form Submission and Data Persistence Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should successfully submit complete form and save data', async ({ page }) => {
    // Fill out complete form with unique test data using faker
    const formData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number('###-###-####'),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode('#####'),
      country: faker.location.country(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraphs(2),
      preferredContact: faker.helpers.arrayElement(['email', 'phone', 'both']),
      urgency: faker.helpers.arrayElement(['low', 'normal', 'high', 'urgent'])
    };

    // Step 1: Personal Information
    await page.fill('input[name="firstName"]', formData.firstName);
    await page.fill('input[name="lastName"]', formData.lastName);
    await page.fill('input[name="email"]', formData.email);
    await page.fill('input[name="phone"]', formData.phone);

    // Step 2: Address Information
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', formData.street);
    await page.fill('input[name="city"]', formData.city);
    await page.fill('input[name="state"]', formData.state);
    await page.fill('input[name="zipCode"]', formData.zipCode);
    await page.fill('input[name="country"]', formData.country);

    // Step 3: Message Details
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', formData.subject);
    await page.fill('textarea[name="message"]', formData.message);
    await page.selectOption('select[name="preferredContact"]', formData.preferredContact);
    await page.selectOption('select[name="urgency"]', formData.urgency);

    // Step 4: Review and Submit
    await page.click('button:has-text("Next")');

    // Verify all data is displayed correctly in review step
    await expect(page.locator(`text=Name: ${formData.firstName} ${formData.lastName}`)).toBeVisible();
    await expect(page.locator(`text=Email: ${formData.email}`)).toBeVisible();
    await expect(page.locator(`p:has-text("${formData.street}")`).first()).toBeVisible();
    await expect(page.locator(`p:has-text("Subject: ${formData.subject}")`).first()).toBeVisible();

    // Submit the form and wait for network response
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/contact') && response.status() === 200
    );
    await page.click('button:has-text("Submit")');
    await responsePromise;

    // Wait for form to reset to step 1 (indicates successful submission)
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible({ timeout: 5000 });

    // Verify form fields are empty after submission
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });
});
