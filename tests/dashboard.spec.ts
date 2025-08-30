import { test, expect } from "@playwright/test";

test.describe("Loan Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the dashboard to load
    await page.waitForSelector("text=DemoApp");
  });

  test("should display app header with correct title", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("DemoApp");
    await expect(page.locator("header")).toBeVisible();
  });

  test("should load borrower pipeline with tabs", async ({ page }) => {
    await expect(page.locator("text=New (")).toBeVisible();
    await expect(page.locator("text=In Review (")).toBeVisible();
    await expect(page.locator("text=Approved (")).toBeVisible();
  });

  test("should display borrower cards in pipeline", async ({ page }) => {
    // Look for Sarah Dunn specifically in h3 elements (pipeline cards) not h2 (detail header)
    await expect(
      page.locator("h3").filter({ hasText: "Sarah Dunn" })
    ).toBeVisible();
    await expect(page.locator("text=Home Loan").first()).toBeVisible();
    await expect(page.locator("text=$300,000").first()).toBeVisible();
  });

  test("should update active borrower when clicked", async ({ page }) => {
    // Wait for initial data to load
    await page.waitForSelector("text=Sarah Dunn");

    // Click on Sarah Dunn
    await page.click("text=Sarah Dunn");

    // Check that borrower detail shows Sarah's information
    await expect(page.locator("text=sarah.dunn@example.com")).toBeVisible();
    await expect(page.locator("text=(355)123-4557")).toBeVisible();
  });

  test("should expand AI Explainability section", async ({ page }) => {
    // Wait for borrower to be selected
    await page.waitForSelector("text=Sarah Dunn");
    await page.click("text=Sarah Dunn");

    // Click on AI Explainability to expand
    await page.click("text=AI Explainability");

    // Check for expanded content
    await expect(
      page.locator("text=Income Inconsistent with Bank statements")
    ).toBeVisible();
    await expect(page.locator("text=Request Documents")).toBeVisible();
  });

  test("should display broker overview information", async ({ page }) => {
    await expect(page.locator("text=Robert Turner")).toBeVisible();
    await expect(page.locator("text=16")).toBeVisible(); // Deals count
    await expect(page.locator("text=75%")).toBeVisible(); // Approval rate
  });

  test("should show workflow steps", async ({ page }) => {
    await expect(page.locator("text=Deal Intake")).toBeVisible();
    await expect(page.locator("text=IDV & Credit Check")).toBeVisible();
    await expect(page.locator("text=Document Upload")).toBeVisible();
  });

  test("should handle action buttons", async ({ page }) => {
    // Select a borrower first
    await page.waitForSelector("text=Sarah Dunn");
    await page.click("text=Sarah Dunn");

    // Expand AI section
    await page.click("text=AI Explainability");

    // Test document request
    await page.click("text=Request Documents");
    await expect(
      page.locator("text=Documents requested successfully")
    ).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that elements stack vertically on mobile
    await expect(page.locator("main > div")).toHaveClass(/grid-cols-1/);
  });

  test("should switch between pipeline tabs", async ({ page }) => {
    // Click on "In Review" tab
    await page.click("text=In Review (1)");

    // Should show Alan Matthews
    await expect(page.locator("text=Alan Matthews")).toBeVisible();
    await expect(page.locator("text=Personal Loan")).toBeVisible();
  });

  test("should toggle AI assistant", async ({ page }) => {
    // Find the toggle button by its structure - a button containing a span with rounded styling
    const toggle = page
      .locator("button")
      .filter({ has: page.locator("span.rounded-full") });

    // Get initial state
    const initialClass = await toggle.getAttribute("class");

    // Click to toggle
    await toggle.click();

    // Wait a bit for state change
    await page.waitForTimeout(500);

    // Check that the class changed (indicating toggle worked)
    const newClass = await toggle.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });
});
