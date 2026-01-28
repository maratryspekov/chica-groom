import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  retries: process.env.CI ? 1 : 0,

  use: {
    baseURL: "http://localhost:4173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  webServer: {
    command: process.env.CI ? "npm run preview" : "npm run dev",
    port: process.env.CI ? 4173 : 5173,
    reuseExistingServer: !process.env.CI,
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
