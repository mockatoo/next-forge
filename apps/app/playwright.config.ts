import { defineConfig } from "@playwright/test";

const port = process.env.PORT ?? "3000";

export default defineConfig({
  testDir: "./e2e",
  // *.e2e.ts keeps these out of Vitest's *.test / *.spec glob.
  testMatch: "**/*.e2e.ts",
  timeout: 120_000,
  expect: { timeout: 30_000 },
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `bun --bun next dev -p ${port}`,
    url: `http://localhost:${port}/sign-in`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
