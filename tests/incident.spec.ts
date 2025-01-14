import { test, expect } from '@playwright/test';

test('Incident E2E', async ({ page }) => {
  await page.goto('YOURSEVER',{ headless: false, slowMo: 1000 });

  await expect(page.getByPlaceholder('User name')).toBeVisible();
  await page.getByPlaceholder('User name').fill('AUTCustomer@tellusmoreref');
  await page.getByPlaceholder('Password', { exact: true }).fill('PASSWORD');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('button', { name: 'Incident', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Incident', exact: true }).click();

  await expect(page.getByTestId('IncidentType:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('IncidentType:select:control').selectOption('Customer service issue');
  await expect(page.getByTestId('IncidentSubType:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('IncidentSubType:select:control').selectOption('Staff conduct issue');

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByTestId('CommunicationChannel:select:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('CommunicationChannel:select:control').selectOption('E-mail');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByTestId('First Name:input:control')).toBeVisible({ timeout: 10_000 });
  await page.getByTestId('First Name:input:control').fill('Roberto');

  await page.getByRole('button', { name: 'Fill form with AI' }).click({ timeout: 10_000 });

  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('UserConsent-parent').getByTestId(':form-field:').getByTestId(':form-field:label').locator('div').check();
  await page.getByTestId('PrivacyPolicy-parent').getByTestId(':form-field:').getByTestId(':form-field:label').locator('div').check();

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByLabel('Stage Dispatch, Current')).toBeVisible({ timeout: 10_000 });

});
