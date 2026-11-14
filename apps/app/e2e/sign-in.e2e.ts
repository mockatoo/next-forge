import { expect, test } from "@playwright/test";

const email = process.env.MOCKATOO_TEST_EMAIL;
const password = process.env.MOCKATOO_TEST_PASSWORD;
const mockatooUrl = /^https:\/\/app\.mockatoo\.globalunderdog\.com\//;

test("GitHub sign-in opens Mockatoo outside production", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await expect(page).toHaveURL(mockatooUrl);
  await expect(page.locator("#email")).toBeVisible();
});

test("signs in with GitHub through Mockatoo", async ({ page }) => {
  // biome-ignore lint/suspicious/noSkippedTests: needs a Mockatoo test account, so CI without one stays green.
  test.skip(
    !(email && password),
    "Set MOCKATOO_TEST_EMAIL and MOCKATOO_TEST_PASSWORD to run the full sign-in."
  );
  await page.goto("/sign-in");
  await page.getByRole("button", { name: "Sign in with GitHub" }).click();
  await page.locator("#email").fill(email as string);
  await page.locator("#password").fill(password as string);
  await page.getByRole("button", { name: "Log in with password" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
