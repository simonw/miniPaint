const { defineConfig, devices } = require('@playwright/test');

// Determine which version to test based on environment
const isReact = process.env.TEST_REACT === 'true';
const baseURL = isReact ? 'http://localhost:8081/index-react.html' : 'http://localhost:8080';
const serverCommand = isReact ? 'npm run server:react:test' : 'npm run server:test';
const serverUrl = isReact ? 'http://localhost:8081' : 'http://localhost:8080';

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: serverCommand,
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
