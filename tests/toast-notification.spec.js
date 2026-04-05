import { test, expect } from '@playwright/test';

test.describe('Toast Notification Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display toast notification after successful form submission', async ({ page }) => {
    // Listen for console errors
    const consoleMessages = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text());
      }
    });

    // Listen for network requests
    const apiRequests = [];
    const apiResponses = [];
    page.on('request', request => {
      if (request.url().includes('/api/contact')) {
        apiRequests.push(request.url());
        console.log('API request:', request.url());
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('/api/contact')) {
        response.text().then(body => {
          apiResponses.push({
            status: response.status(),
            body: body
          });
          console.log('API response:', response.status(), body);
        });
      }
    });

    // Fill out the form completely
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '123-456-7890');

    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled using a more reliable approach
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.waitFor({ state: 'visible', timeout: 5000 });
    await expect(nextButton).toBeEnabled();
    
    await nextButton.click();

    // Wait for address step to be visible
    await page.waitForSelector('input[name="street"]', { timeout: 5000 });

    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');

    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled using a more reliable approach
    const nextButton2 = page.locator('button:has-text("Next")').first();
    await nextButton2.waitFor({ state: 'visible', timeout: 5000 });
    await expect(nextButton2).toBeEnabled();
    
    await nextButton2.click();

    // Wait for message step to be visible
    await page.waitForSelector('input[name="subject"]', { timeout: 5000 });

    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message for toast notification');

    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled using a more reliable approach
    const nextButton3 = page.locator('button:has-text("Next")').first();
    await nextButton3.waitFor({ state: 'visible', timeout: 5000 });
    await expect(nextButton3).toBeEnabled();
    
    await nextButton3.click();

    // Wait for review step to be visible
    await page.waitForSelector('button:has-text("Submit")', { timeout: 5000 });

    // Check what step we're actually on
    const currentStepInfo = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitButton = buttons.find(b => b.textContent.includes('Submit'));
      const nextButton = buttons.find(b => b.textContent.includes('Next'));
      return {
        hasSubmitButton: !!submitButton,
        hasNextButton: !!nextButton,
        allButtons: buttons.map(b => b.textContent.trim()).filter(t => t)
      };
    });
    console.log('Current step info:', currentStepInfo);

    // Wait for submit button to be enabled
    const submitButton = page.locator('button:has-text("Submit")').first();
    await expect(submitButton).toBeEnabled();
    
    // Submit the form
    await submitButton.click();

    console.log('Form submitted, checking for toast immediately...');
    
    // Check for toast immediately (before auto-dismiss)
    await page.waitForTimeout(100);
    
    const immediateToast = await page.locator('div:has-text("Contact form submitted successfully!")').count();
    console.log('Immediate toast elements found:', immediateToast);
    
    // Check for any toast components immediately
    const immediateToastComponents = await page.locator('div[class*="animate-slide-in-right"]').count();
    console.log('Immediate toast components found:', immediateToastComponents);

    console.log('Form submitted, waiting for response...');
    
    // Wait a bit longer for the API call to complete and toast to appear
    await page.waitForTimeout(3000);
    
    console.log('API requests made:', apiRequests);
    console.log('API responses received:', apiResponses);
    console.log('Console messages:', consoleMessages);

    // Check if toast element exists in DOM (even if not visible)
    const toastElement = await page.locator('div:has-text("Contact form submitted successfully!")').count();
    console.log('Toast elements found:', toastElement);
    
    // Check for any toast elements at all
    const allToastElements = await page.locator('div[class*="fixed"][class*="top-20"]').count();
    console.log('All fixed top-20 elements found:', allToastElements);
    
    // Check if the Toast component is rendered at all
    const toastComponent = await page.locator('div[class*="animate-slide-in-right"]').count();
    console.log('Toast components found:', toastComponent);
    
    // Wait a bit more in case there's a rendering delay
    await page.waitForTimeout(2000);
    
    // Check again after delay
    const delayedToast = await page.locator('div:has-text("Contact form submitted successfully!")').count();
    console.log('Delayed toast elements found:', delayedToast);
    
    // Check the React state (if possible)
    const showToastState = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.map(b => b.textContent).join(', ');
    });
    console.log('Buttons on page:', showToastState);

    // Wait for toast to appear
    await page.waitForSelector('div:has-text("Contact form submitted successfully!")', { timeout: 10000 });

    // Verify toast is visible
    const toast = page.locator('div:has-text("Contact form submitted successfully!")').first();
    await expect(toast).toBeVisible();

    // Verify toast message
    await expect(toast).toContainText('Contact form submitted successfully!');

    // Verify toast has success styling (green gradient)
    const toastContainer = toast.locator('div').first();
    await expect(toastContainer).toHaveClass(/from-green-500/);

    // Verify toast auto-dismisses after 3 seconds
    await page.waitForTimeout(3500);
    await expect(toast).not.toBeVisible();
  });

  test('should display error toast on failed submission', async ({ page }) => {
    // Mock a failed API response
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Server error' })
      });
    });

    // Fill out form quickly
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for address step to be visible
    await page.waitForSelector('input[name="street"]', { timeout: 5000 });
    
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for message step to be visible
    await page.waitForSelector('input[name="subject"]', { timeout: 5000 });
    
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Wait for error toast
    await page.waitForSelector('div:has-text("Something went wrong. Please try again.")', { timeout: 5000 });

    // Verify error toast
    const toast = page.locator('div:has-text("Something went wrong. Please try again.")').first();
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Something went wrong. Please try again.');

    // Verify error styling (red gradient)
    const toastContainer = toast.locator('div').first();
    await expect(toastContainer).toHaveClass(/from-red-500/);
  });

  test('should allow manual dismissal of toast', async ({ page }) => {
    // Fill out form minimally for quick submission
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for address step to be visible
    await page.waitForSelector('input[name="street"]', { timeout: 5000 });
    
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for message step to be visible
    await page.waitForSelector('input[name="subject"]', { timeout: 5000 });
    
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');

    // Wait for review step to be visible
    await page.waitForSelector('button:has-text("Submit")', { timeout: 5000 });

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Wait for toast to appear
    await page.waitForSelector('div:has-text("Contact form submitted successfully!")', { timeout: 5000 });

    // Click the close button
    await page.click('div:has-text("Contact form submitted successfully!") button');

    // Verify toast is immediately hidden
    await expect(page.locator('div:has-text("Contact form submitted successfully!")')).not.toBeVisible();
  });

  test('should show toast with proper animation', async ({ page }) => {
    // Fill out form quickly
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for address step to be visible
    await page.waitForSelector('input[name="street"]', { timeout: 5000 });
    
    await page.fill('input[name="street"]', '123 Test St');
    await page.fill('input[name="city"]', 'Test City');
    await page.fill('input[name="state"]', 'TS');
    await page.fill('input[name="zipCode"]', '12345');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');
    
    // Wait for message step to be visible
    await page.waitForSelector('input[name="subject"]', { timeout: 5000 });
    
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Wait a moment for state to update
    await page.waitForTimeout(100);
    
    // Wait for Next button to be enabled
    await page.waitForSelector('button:has-text("Next"):not([disabled])', { timeout: 5000 });
    
    await page.click('button:has-text("Next")');

    // Wait for review step to be visible
    await page.waitForSelector('button:has-text("Submit")', { timeout: 5000 });

    // Submit the form
    await page.click('button:has-text("Submit")');

    // Wait for toast to appear with animation
    const toast = page.locator('div:has-text("Contact form submitted successfully!")').first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    // Verify the animation class is present
    await expect(toast).toHaveClass(/animate-slide-in-right/);

    // Verify toast positioning (fixed, top-20, right-4)
    await expect(toast).toHaveCSS('position', 'fixed');
  });
});
