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

        //should be marked completed (check the checkbox is checked and stats updated)
        await expect(page.locator('.checkbox')).toBeChecked();
        await expect(page.locator('.stat-value').nth(2)).toContainText('1'); //completed count
        await expect(page.locator('.stat-value').nth(1)).toContainText('0'); //active count
    });
    test('should delete a todo', async ({ page }) => {
        //add a todo
        await page.fill('input[type="text"]', 'Delete me');
        await page.click('button:has-text("Add")');

        //delete it
        page.on('dialog', dialog => dialog.accept());
        await page.click('.delete-btn');

        //should be gone
        await expect(page.locator('.empty-state')).toBeVisible();
        await expect(page.locator('.stat-value').first()).toContainText('0');
    });

    test('should edit a todo', async ({ page }) => {
        //add a todo
        await page.fill('input[type="text"]', 'Original');
        await page.click('button:has-text("Add")');

        //edit it
        await page.click('.edit-btn');
        await page.fill('.edit-input', 'Updated');
        await page.click('.save-btn');

        await expect(page.locator('.todo-text')).toContainText('Updated');
    });

    test('should persist todos after refresh', async ({ page }) => {
        //add a todo
        await page.fill('input[type="text"]', 'Persistent');
        await page.click('button:has-text("Add")');

        //refresh
        await page.reload();

        //should still be there
        await expect(page.locator('.todo-text')).toContainText('Persistent');
    });

    test('should clear completed todos', async ({ page }) => {
        //add two todos
        await page.fill('input[type="text"]', 'Task 1');
        await page.click('button:has-text("Add")');
        await page.fill('input[type="text"]', 'Task 2');
        await page.click('button:has-text("Add")');

        //complete first one
        await page.check('.checkbox');

        //clear completed
        page.on('dialog', dialog => dialog.accept());
        await page.click('.clear-completed');

        //only task 2 should remain
        await expect(page.locator('.todo-text')).toHaveCount(1);
        await expect(page.locator('.todo-text')).toContainText('Task 2');
    });
});