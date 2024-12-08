import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test', //diretório dos testes
  fullyParallel: true,
  testMatch: /.*\.e2e-spec\.ts$/,
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0, //faz todo o teste tentar 2 vezes se falhar
  workers: process.env.CI ? 1 : undefined, //quantos testes quero rodar em paralelo
  reporter: 'html',  //que formato quero exportar os rsultados dos testes
  use: {   
    baseURL: 'http://localhost:50789', //mesma porta que foi configurada para os testes
  },
 webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:50789', //mesma porta que foi configurada para os testes
    reuseExistingServer: !process.env.CI,
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],

  /* Run your local dev server before starting the tests */
 
});
