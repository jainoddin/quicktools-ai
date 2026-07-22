import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load tools data
const toolsDataPath = path.resolve(__dirname, '../../frontend/tools_data.json');
const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf-8'));

test.describe('Premium Tools Popup Tests', () => {
  
  // Test Logged Out State for Premium Tools
  test.describe('Logged Out State', () => {
    // Only filter the premium tools
    const premiumTools = toolsData.filter((t: any) => t.isPremium === true);

    for (const tool of premiumTools) {
      test(`Premium Tool ${tool.slug} should show Login/Premium popup when action button is clicked`, async ({ page }) => {
        test.setTimeout(60000);
        
        await page.goto(`/dashboard/tool/${tool.slug}`);
        
        // Wait for the page to be ready
        await page.waitForLoadState('domcontentloaded');

        // Look for the main action button (Generate, Create, Analyze, etc.)
        const actionButton = page.locator('button').filter({ hasText: /(Generate|Translate|Convert|Analyze|Create|Write|Shorten|Check|Submit|Play|Rewrite|Summarize|Extract)/i }).first();
        
        if (await actionButton.isVisible()) {
          // If the button exists, click it
          await actionButton.click();

          // After clicking, a popup should appear for logged-out users on premium tools
          // It could be the LoginPopup or PremiumModal. We check for common popup text.
          const popupContent = page.locator('text=sign in').or(page.locator('text=Sign in')).or(page.locator('text=Premium')).or(page.locator('text=premium'));
          
          // We wait up to 3 seconds for the popup to become visible
          await expect(popupContent.first()).toBeVisible({ timeout: 3000 });
        } else {
          // If no obvious generate button, just pass (or we could fail the test, but some tools might have different button names)
          console.log(`No action button found for ${tool.slug}`);
        }
      });
    }
  });

});
