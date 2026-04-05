import { test, expect } from '@playwright/test';

test.describe('Page Reload Prevention Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should not reload page when pressing Enter in input fields', async ({ page }) => {
    // Get initial URL
    const initialUrl = page.url();
    
    // Fill first input and press Enter
    await page.fill('input[name="firstName"]', 'Test');
    await page.press('input[name="firstName"]', 'Enter');
    
    // Verify URL hasn't changed (no reload)
    expect(page.url()).toBe(initialUrl);
    
    // Verify we're still on step 1 (Personal Info)
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible();
    
    // Test with other input fields
    await page.fill('input[name="lastName"]', 'User');
    await page.press('input[name="lastName"]', 'Enter');
    expect(page.url()).toBe(initialUrl);
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.press('input[name="email"]', 'Enter');
    expect(page.url()).toBe(initialUrl);
    
    await page.fill('input[name="phone"]', '123-456-7890');
    await page.press('input[name="phone"]', 'Enter');
    expect(page.url()).toBe(initialUrl);
  });

  test('should not reload page when pressing Enter in textarea', async ({ page }) => {
    // Navigate to message step
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    
    const initialUrl = page.url();
    
    // Fill textarea and press Enter
    await page.fill('textarea[name="message"]', 'Test message');
    await page.press('textarea[name="message"]', 'Enter');
    
    // Verify URL hasn't changed
    expect(page.url()).toBe(initialUrl);
    
    // Verify we're still on message step
    await expect(page.locator('h2:has-text("Message Details")')).toBeVisible();
  });

  test('should not reload page when pressing Enter in select elements', async ({ page }) => {
    // Navigate to message step
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    
    const initialUrl = page.url();
    
    // Open select and press Enter
    await page.click('select[name="preferredContact"]');
    await page.press('select[name="preferredContact"]', 'Enter');
    
    // Verify URL hasn't changed
    expect(page.url()).toBe(initialUrl);
    
    // Test urgency select
    await page.click('select[name="urgency"]');
    await page.press('select[name="urgency"]', 'Enter');
    expect(page.url()).toBe(initialUrl);
  });

  test('should not reload page when clicking navigation buttons', async ({ page }) => {
    const initialUrl = page.url();
    
    // Fill required fields for step 1
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Click Next button
    await page.click('button:has-text("Next")');
    
    // Verify URL hasn't changed (no reload)
    expect(page.url()).toBe(initialUrl);
    
    // Verify we moved to step 2
    await expect(page.locator('h2:has-text("Address Information")')).toBeVisible();
    
    // Click Previous button
    await page.click('button:has-text("Previous")');
    
    // Still no reload
    expect(page.url()).toBe(initialUrl);
    
    // Back to step 1
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible();
  });

  test('should not reload page when clicking View Contacts button', async ({ page }) => {
    const initialUrl = page.url();
    
    // Click View Contacts button
    await page.click('button:has-text("View Contacts")');
    
    // Verify URL hasn't changed
    expect(page.url()).toBe(initialUrl);
    
    // Verify contact list is shown
    await expect(page.locator('text=Contact List')).toBeVisible();
    
    // Click Show Form button
    await page.click('button:has-text("Show Form")');
    
    // Still no reload
    expect(page.url()).toBe(initialUrl);
    
    // Form is visible again
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible();
  });

  test('should not reload page when submitting form', async ({ page }) => {
    // Fill out complete form
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '123-456-7890');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button:has-text("Next")');
    
    const initialUrl = page.url();
    
    // Submit form
    await page.click('button:has-text("Submit")');
    
    // Verify URL hasn't changed (no reload)
    expect(page.url()).toBe(initialUrl);
    
    // Verify toast appears (indicating successful submission)
    await expect(page.locator('[class*="animate-slide-in-right"]')).toBeVisible({ timeout: 5000 });
    
    // Verify form reset to step 1
    await expect(page.locator('h2:has-text("Personal Information")')).toBeVisible();
    
    // Verify form fields are empty
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });

  test('should have proper form wrapper with preventDefault', async ({ page }) => {
    // Check that form element exists
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check that form has onSubmit handler
    const formElement = await form.elementHandle();
    const onSubmitHandler = await page.evaluate((el) => {
      return el.onsubmit !== null;
    }, formElement);
    
    expect(onSubmitHandler).toBe(true);
  });

  test('should have type="button" on all interactive buttons', async ({ page }) => {
    // Check navigation buttons
    const prevButton = page.locator('button:has-text("Previous")');
    await expect(prevButton).toHaveAttribute('type', 'button');
    
    // Fill form to enable Next button
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toHaveAttribute('type', 'button');
    
    // Check View Contacts button
    const viewContactsButton = page.locator('button:has-text("View Contacts")');
    await expect(viewContactsButton).toHaveAttribute('type', 'button');
    
    // Go to final step to check Submit button
    await page.click('button:has-text("Next")');
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    await page.click('button:has-text("Next")');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button:has-text("Next")');
    
    const submitButton = page.locator('button:has-text("Submit")');
    await expect(submitButton).toHaveAttribute('type', 'button');
  });
});
