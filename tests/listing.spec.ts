import { test, expect } from '@playwright/test';

test.describe('Property Listings', () => {
    test('should display listings page', async ({ page }) => {
        await page.goto('/annonces');
        await expect(page).toHaveURL('/annonces');
    });
});
