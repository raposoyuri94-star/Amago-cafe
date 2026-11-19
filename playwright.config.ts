import { defineConfig } from '@playwright/test';

const testPort = process.env.PLAYWRIGHT_PORT || '5173';
const testUrl = `http://127.0.0.1:${testPort}${process.env.PLAYWRIGHT_BASE_PATH || '/'}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  globalTimeout: 10 * 60 * 1000,
  workers: 2,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: testUrl, channel: 'chrome', headless: true, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: `${process.env.PLAYWRIGHT_PREVIEW ? 'npm run preview' : 'npm run dev'} -- --port ${testPort} --strictPort`, url: testUrl, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
