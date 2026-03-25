/* eslint-disable @typescript-eslint/no-require-imports */
const { test, expect } = require('@playwright/test');

const agentPages = [
  {
    name: 'First Guardian',
    path: '/agent/first-guardian',
    heading: /First Guardian/i,
  },
  {
    name: 'Mr. KPA',
    path: '/agent/mr-kpa',
    heading: /Mr\. KPA/i,
  },
  {
    name: 'TokFaith',
    path: '/agent/tokfaith',
    heading: /TokFaith/i,
  },
];

for (const agentPage of agentPages) {
  test(`${agentPage.name} renders on mobile`, async ({ page }) => {
    await page.goto(agentPage.path, { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: agentPage.heading })).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();

    const buttons = page.getByRole('button');
    await expect(buttons.first()).toBeVisible();

    const bodyBox = await page.locator('body').boundingBox();
    expect(bodyBox).not.toBeNull();

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });

    expect(overflowX).toBeLessThanOrEqual(1);
  });
}