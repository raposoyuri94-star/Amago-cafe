import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'English', exact: true }).click();
});

test('Portuguese is the default for new visitors', async ({ page }) => {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Uma pequena pausa.Cheia de alma.');
  await expect(page.getByRole('button', { name: 'Português', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('loads every image, has no runtime errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little pause.A lot of soul.');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `artifacts/${testInfo.project.name}.png`, fullPage: true });
});

test('filters menu, opens details, traps focus, and restores focus on Escape', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Something sweet' }).click();
  await expect(page.getByRole('tab', { name: 'Something sweet' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('A golden little detour');
  const trigger = page.getByRole('button', { name: 'Discover: A golden little detour' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'A golden little detour' })).toBeVisible();
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('tab', { name: 'Slow brunch' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Make a morning of it');
});

test('switches and remembers language; FAQ expands; directions point to Maputo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Português', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Uma pequena pausa.Cheia de alma.');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Português', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByText('Onde posso encontrar o menu actual?', { exact: true }).click();
  await expect(page.locator('details[open]')).toContainText('As sugestões neste site são ilustrativas.');
  await expect(page.getByRole('link', { name: 'Como chegar', exact: true }).first()).toHaveAttribute('href', /google\.com\/maps\/search.*Maputo/);
});

test('navigation works on mobile; tabs support arrow keys on desktop', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.locator('button[aria-controls="main-navigation"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('navigation').getByRole('link', { name: 'The menu' }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#menu$/);
  } else {
    await page.getByRole('tab', { name: 'Coffee', exact: true }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Something sweet' })).toBeFocused();
    await expect(page.getByRole('tabpanel')).toContainText('A golden little detour');
  }
});
