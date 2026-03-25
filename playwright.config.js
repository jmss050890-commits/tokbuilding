const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  use: {
    baseURL: process.env.SVL_TEST_BASE_URL || 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'node node_modules/next/dist/bin/next dev --port 3001',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'iphone-13',
      use: {
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'pixel-5',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
});