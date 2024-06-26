import { test, expect } from '@playwright/test'

test('OTel Browser Check', async ({ page }) => {
  const response = await page.goto('https://otel-test-app.vercel.app')
  expect(response?.status()).toBeLessThan(400)
})
