import { test, expect } from '@playwright/test';

test.describe('Todo App - Essential Features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('should add a todo', async ({ page }) => {
        await page.fill('input[type="text"]', 'Buy groceries');
        await page.click('button:has-text("Add")');

        await expect(page.locator('.todo-text')).toContainText('Buy groceries');
        await expect(page.locator('.stat-value').first()).toContainText('1');
    });

    test('should complete a todo', async ({ page }) => {
        //add a todo
        await page.fill('input[type="text"]', 'Test task');
        await page.click('button:has-text("Add")');

        //complete it
        await page.check('.checkbox');

        //should be marked completed
        await expect(page.locator('.todo-text')).toHaveClass(/completed/);
        await expect(page.locator('.stat-value').nth(2)).toContainText('1'); //completed count
    });
});