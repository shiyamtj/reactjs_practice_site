import { test, expect } from '@playwright/test';

test.describe('Form Submission and Data Persistence Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should successfully submit complete form and save data', async ({ page }) => {
    // Fill out complete form with test data
    const formData = {
      firstName: 'Playwright',
      lastName: 'Test',
      email: 'playwright@test.com',
      phone: '555-123-4567',
      street: '456 Test Avenue',
      city: 'Testville',
      state: 'TS',
      zipCode: '54321',
      country: 'Testland',
      subject: 'Playwright Test Submission',
      message: 'This is a test submission from Playwright to verify form functionality',
      preferredContact: 'email',
      urgency: 'normal'
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
    await expect(page.locator('text=Name: Playwright Test')).toBeVisible();
    await expect(page.locator(`text=Email: ${formData.email}`)).toBeVisible();
    await expect(page.locator(`text=${formData.street}`)).toBeVisible();
    await expect(page.locator(`text=Subject: ${formData.subject}`)).toBeVisible();

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Wait for successful submission toast
    await expect(page.locator('[class*="animate-slide-in-right"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[class*="animate-slide-in-right"]')).toContainText('Contact form submitted successfully!');

    // Verify form resets to step 1
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible();

    // Verify form fields are empty after submission
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });

  test('should validate form fields correctly', async ({ page }) => {
    // Test Next button disabled when required fields are empty
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeDisabled();

    // Fill only first name - should still be disabled
    await page.fill('input[name="firstName"]', 'Test');
    await expect(nextButton).toBeDisabled();

    // Fill last name - should still be disabled
    await page.fill('input[name="lastName"]', 'User');
    await expect(nextButton).toBeDisabled();

    // Fill email - should now be enabled
    await page.fill('input[name="email"]', 'test@example.com');
    await expect(nextButton).toBeEnabled();

    // Go to step 2
    await page.click('button:has-text("Next")');

    // Verify step 2 validation
    const step2NextButton = page.locator('button:has-text("Next")');
    await expect(step2NextButton).toBeDisabled();

    // Fill required address fields
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await expect(step2NextButton).toBeEnabled();

    // Go to step 3
    await page.click('button:has-text("Next")');

    // Verify step 3 validation
    const step3NextButton = page.locator('button:has-text("Next")');
    await expect(step3NextButton).toBeDisabled();

    // Fill required message fields
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    await expect(step3NextButton).toBeEnabled();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock server error
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Internal server error' })
      });
    });

    // Fill out form quickly
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button:has-text("Next")');

    // Submit form
    await page.click('button:has-text("Submit")');

    // Should show error toast
    await expect(page.locator('[class*="animate-slide-in-right"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[class*="animate-slide-in-right"]')).toContainText('Something went wrong');

    // Form should not reset on error
    await expect(page.locator('h2:has-text("Review & Confirm")')).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Mock slow API response
    await page.route('**/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Contact form submitted successfully' })
      });
    });

    // Fill out form quickly
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button:has-text("Next")');

    // Submit form
    await page.click('button:has-text("Submit")');

    // Verify loading state
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toContainText('Submitting...');
    await expect(submitButton.locator('svg[class*="animate-spin"]')).toBeVisible();

    // Wait for completion
    await expect(page.locator('[class*="animate-slide-in-right"]')).toBeVisible({ timeout: 5000 });
  });

  test('should maintain form data during navigation', async ({ page }) => {
    // Fill step 1 data
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '555-123-4567');

    // Go to step 2
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');

    // Go back to step 1
    await page.click('button:has-text("Previous")');

    // Verify step 1 data is preserved
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Test');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="phone"]')).toHaveValue('555-123-4567');

    // Go forward to step 2 again
    await page.click('button:has-text("Next")');

    // Verify step 2 data is preserved
    await expect(page.locator('input[name="street"]')).toHaveValue('123 Test St');
    await expect(page.locator('input[name="city"]')).toHaveValue('Test City');
  });

  test('should store data with correct API format', async ({ page }) => {
    // Intercept API request to verify data format
    let requestData = null;
    await page.route('**/api/contact', async route => {
      const request = route.request();
      requestData = await request.postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Contact form submitted successfully' })
      });
    });

    // Fill out complete form
    await page.fill('input[name="firstName"]', 'API');
    await page.fill('input[name="lastName"]', 'Test');
    await page.fill('input[name="email"]', 'api@test.com');
    await page.fill('input[name="phone"]', '555-999-1234');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '789 API Street');
    await page.fill('input[name="city"]', 'API City');
    await page.fill('input[name="state"]', 'API');
    await page.fill('input[name="zipCode"]', '99999');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', 'API Test');
    await page.fill('textarea[name="message"]', 'API test message');
    await page.click('button:has-text("Next")');

    // Submit form
    await page.click('button:has-text("Submit")');

    // Wait for request to be captured
    await page.waitForTimeout(1000);

    // Verify request data format
    expect(requestData).not.toBeNull();
    expect(requestData.firstName).toBe('API');
    expect(requestData.lastName).toBe('Test');
    expect(requestData.email).toBe('api@test.com');
    expect(requestData.phone).toBe('555-999-1234');
    expect(requestData.street).toBe('789 API Street');
    expect(requestData.city).toBe('API City');
    expect(requestData.state).toBe('API');
    expect(requestData.zipCode).toBe('99999');
    expect(requestData.subject).toBe('API Test');
    expect(requestData.message).toBe('API test message');
    expect(requestData.preferredContact).toBe('email');
    expect(requestData.urgency).toBe('normal');
  });
});
