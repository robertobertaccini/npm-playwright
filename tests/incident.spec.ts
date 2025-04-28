import { test, expect } from '@playwright/test';

test('Incident E2E', async ({ page }) => {

  await page.goto(process.env.TARGETURL);

  await expect(page.getByPlaceholder('User name')).toBeVisible();
  await page.getByPlaceholder('User name').fill('CustomerREF@SL');
  await page.getByPlaceholder('Password', { exact: true }).fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('button', { name: 'Incident', exact: true })).toBeVisible({ timeout: 10_000 });
  await page.getByRole('button', { name: 'Incident', exact: true }).click();

  await expect(page.getByTestId('Incident Type:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('Incident Type:select:control').selectOption('Customer service issue');
  await expect(page.getByTestId('Incident Subtype:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('Incident Subtype:select:control').selectOption('Staff conduct issue');

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByTestId('Communication channel used:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('Communication channel used:select:control').selectOption('E-mail');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByTestId('First Name:input:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('First Name:input:control').fill('Roberto');
  await page.locator('label').filter({ hasText: 'Manually' }).locator('div').click();
  //await page.getByRole('button', { name: 'Fill form with AI' }).click({ timeout: 10_000 });

  await page.getByRole('button', { name: 'Next' }).click();

  await page.locator('label').filter({ hasText: 'I agree to Terms and Conditions' }).locator('div').click();
  await page.locator('label').filter({ hasText: 'I agree with Privacy Policy' }).locator('div').click();
  // await page.getByTestId('UserConsent-parent').getByTestId(':form-field:').getByTestId(':form-field:label').locator('div').check();
  // await page.getByTestId('PrivacyPolicy-parent').getByTestId(':form-field:').getByTestId(':form-field:label').locator('div').check();

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByLabel('Stage Dispatch, Current')).toBeVisible({ timeout: 10_000 });

});
