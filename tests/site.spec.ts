import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'English', exact: true }).click();
});

test('Portuguese is the default for new visitors', async ({ page }) => {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Café e matcha.Em Maputo.');
  await expect(page.getByRole('button', { name: 'Português', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('loads every image, has no runtime errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Coffee and matcha.In Maputo.');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `artifacts/${testInfo.project.name}.png`, fullPage: true });
});

test('shows real menu prices, original menus, and Thursday pastry availability', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('row', { name: 'Espresso 120 MT 200 MT', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Matcha bar' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Coconut water matcha');
  await expect(page.getByRole('row', { name: 'Matcha latte 350 MT 490 MT', exact: true })).toBeVisible();
  const trigger = page.getByRole('button', { name: 'View original menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /\/images\/menu-matcha\.png$/);
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /\/images\/menu-food\.png$/);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('tab', { name: 'Pastries' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Thursdays only.');
  await expect(page.getByRole('row', { name: /Banana bread muffin/ })).toContainText('200');
});

test('gallery opens, changes images, and returns focus when closed', async ({ page }) => {
  await page.goto('./galeria.html');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gallery');
  await page.reload();
  const trigger = page.getByRole('button', { name: 'Enlarge: Made with soul. Served with intention.' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /\/images\/amago-team\.png$/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /\/images\/amago-reading\.png$/);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('gallery has its own page and links back to the home menu', async ({ page }, testInfo) => {
  await expect(page.locator('#gallery')).toHaveCount(0);
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Gallery', exact: true }).click();
  await expect(page).toHaveURL(/\/galeria\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gallery');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'The menu' }).click();
  await expect(page).toHaveURL(/\/#menu$/);
  await expect(page.getByRole('tabpanel')).toBeVisible();
});

test('switches and remembers language; FAQ expands; directions point to Maputo', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Português', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Café e matcha.Em Maputo.');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Português', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByText('Onde posso encontrar o menu actual?', { exact: true }).click();
  await expect(page.locator('details[open]')).toContainText('Também pode consultar os menus originais.');
  await expect(page.getByRole('link', { name: 'Como chegar', exact: true }).first()).toHaveAttribute('href', /google\.com\/maps\/search.*Maputo/);
});

test('navigation works on mobile; tabs support arrow keys on desktop', async ({ page }, testInfo) => {
  await page.goto('./');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.locator('button[aria-controls="main-navigation"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'The menu' }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#menu$/);
  } else {
    await page.getByRole('tab', { name: 'Coffee', exact: true }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Matcha bar' })).toBeFocused();
    await expect(page.getByRole('tabpanel')).toContainText('Coconut water matcha');
  }
});

test('mobile bottom tabs navigate both pages while keeping the hamburger', async ({ page }, testInfo) => {
  const bar = page.getByRole('navigation', { name: 'Mobile navigation', exact: true });
  if (testInfo.project.name === 'desktop') {
    await expect(bar).toBeHidden();
    return;
  }
  await expect(bar).toBeVisible();
  await expect(bar.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'location');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await bar.getByRole('link', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#menu$/);
  await expect(bar.getByRole('link', { name: 'Menu', exact: true })).toHaveAttribute('aria-current', 'location');
  await bar.getByRole('link', { name: 'Gallery', exact: true }).click();
  await expect(page).toHaveURL(/\/galeria\.html$/);
  await expect(bar.getByRole('link', { name: 'Gallery', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
  await bar.getByRole('link', { name: 'Visit', exact: true }).click();
  await expect(page).toHaveURL(/\/#visit$/);
  await expect(bar.getByRole('link', { name: 'Visit', exact: true })).toHaveAttribute('aria-current', 'location');
  await bar.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(bar.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'location');
});
