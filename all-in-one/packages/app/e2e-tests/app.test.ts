/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test, expect } from '@playwright/test';

interface Theme {
  title: string;
  screenshotSuffix: string;
}

const themes: Theme[] = [
  { title: 'Backstage Light', screenshotSuffix: '-backstage-light' },
  { title: 'Backstage Dark', screenshotSuffix: '-backstage-dark' },
  { title: 'RHDH Light (latest)', screenshotSuffix: '-rhdh-light' },
  { title: 'RHDH Dark (latest)', screenshotSuffix: '-rhdh-dark' },
]

test('all-in-one app and make some screenshots', async ({ page }) => {
  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];

    // Login
    await page.goto('/');
    await expect(page.getByText('Scaffolded Backstage App')).toBeVisible();
    await page.screenshot({ path: `1-login${theme.screenshotSuffix}.png` });

    // Home
    await page.getByRole('button', { name: 'Enter' }).click();
    await expect(page.getByText('Top Visited')).toBeVisible();
    await page.screenshot({ path: `2-home${theme.screenshotSuffix}.png` });

    // Catalog
    await page.getByLabel('Catalog').click();
    await expect(page.getByText('My Company Catalog')).toBeVisible();
    await page.screenshot({ path: `3-catalog${theme.screenshotSuffix}.png` });

    // Catalog entry
    // await expect(page.getByText('all-in-one-example')).toBeVisible();
    await page.getByText('all-in-one-example').click();
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Recent Travis-CI Builds')).toBeVisible();
    await page.screenshot({ path: `4-catalog-entry${theme.screenshotSuffix}.png` });

    // Create
    await page.getByLabel('Create...').click();
    await expect(page.getByText('Create a new component')).toBeVisible();
    await expect(page.getByText('Example Node.js Template')).toBeVisible();
    await page.screenshot({ path: `5-create${theme.screenshotSuffix}.png` });

    // Create template
    await page.getByRole('button', { name: 'Choose' }).click();
    await expect(page.getByText('Fill in some steps')).toBeVisible();
    await page.screenshot({ path: `6-create-template${theme.screenshotSuffix}.png` });

    // Catalog import
    await page.getByLabel('Create...').click();
    await expect(page.getByText('Create a new component')).toBeVisible();
    await page.getByRole('button', { name: 'Register Existing Component' }).click();
    await expect(page.getByText('Learn more about the Software Catalog')).toBeVisible();
    await page.screenshot({ path: `7-catalog-import${theme.screenshotSuffix}.png` });

    // Settings
    await page.getByLabel('Settings').click();
    await expect(page.getByText('General')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
    await expect(page.getByText('Appearance')).toBeVisible();
    await page.screenshot({ path: `8-settings${theme.screenshotSuffix}.png` });

    // Feature flags
    await page.getByText('Feature Flags').click();
    await expect(page.getByText('No Feature Flags')).toBeVisible();
    await page.screenshot({ path: `9-feature-flags${theme.screenshotSuffix}.png` });

    // Switch to next theme and logout
    if (i < themes.length - 1) {
      const nextTheme = themes[i + 1];
      await page.getByLabel('Settings').click();
      await page.getByRole('button', { name: nextTheme.title }).click();
      await page.getByTestId('user-settings-menu').click();
      await page.getByTestId('sign-out').click();
    }
  }
});
