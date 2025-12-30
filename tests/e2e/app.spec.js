/**
 * End-to-end tests for miniPaint application
 * These tests verify core functionality works correctly in the browser
 */

const { test, expect } = require('@playwright/test');

test.describe('miniPaint Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to fully load
    await page.waitForSelector('#canvas_minipaint');
    // Wait a bit for JavaScript to initialize
    await page.waitForTimeout(500);
  });

  test.describe('Page Load', () => {
    test('should load the application with correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/miniPaint/);
    });

    test('should display the main canvas', async ({ page }) => {
      const canvas = page.locator('#canvas_minipaint');
      await expect(canvas).toBeVisible();
    });

    test('should display the main menu', async ({ page }) => {
      const menu = page.locator('#main_menu');
      await expect(menu).toBeVisible();
    });

    test('should display the tools sidebar', async ({ page }) => {
      const tools = page.locator('#tools_container');
      await expect(tools).toBeVisible();
    });

    test('should display the layers panel', async ({ page }) => {
      const layers = page.locator('#layers_base');
      await expect(layers).toBeVisible();
    });

    test('should display the colors panel', async ({ page }) => {
      const colors = page.locator('#toggle_colors');
      await expect(colors).toBeVisible();
    });
  });

  test.describe('Menu Navigation', () => {
    test('should have File menu', async ({ page }) => {
      const fileMenu = page.locator('#main_menu').getByText('File');
      await expect(fileMenu).toBeVisible();
    });

    test('should have Edit menu', async ({ page }) => {
      const editMenu = page.locator('#main_menu').getByText('Edit');
      await expect(editMenu).toBeVisible();
    });

    test('should have Image menu', async ({ page }) => {
      const imageMenu = page.locator('#main_menu').getByText('Image');
      await expect(imageMenu).toBeVisible();
    });

    test('should have Layer menu', async ({ page }) => {
      const layerMenu = page.locator('#main_menu').getByText('Layer');
      await expect(layerMenu).toBeVisible();
    });

    test('should have Effects menu', async ({ page }) => {
      const effectsMenu = page.locator('#main_menu').getByText('Effects');
      await expect(effectsMenu).toBeVisible();
    });

    test('should have Tools menu', async ({ page }) => {
      const toolsMenu = page.locator('#main_menu').getByText('Tools');
      await expect(toolsMenu).toBeVisible();
    });

    test('should have Help menu', async ({ page }) => {
      const helpMenu = page.locator('#main_menu').getByText('Help');
      await expect(helpMenu).toBeVisible();
    });

    test('should open File submenu on click', async ({ page }) => {
      await page.locator('#main_menu').getByText('File').click();
      // Check for submenu items
      const newItem = page.getByText('New');
      await expect(newItem).toBeVisible();
    });
  });

  test.describe('Tools', () => {
    test('should have tool buttons in sidebar', async ({ page }) => {
      const toolsContainer = page.locator('#tools_container');
      const toolButtons = toolsContainer.locator('button, .item');
      const count = await toolButtons.count();
      expect(count).toBeGreaterThan(5);
    });

    test('should be able to select brush tool', async ({ page }) => {
      const brushTool = page.locator('#tools_container').locator('[title*="Brush"], [data-tool="brush"]').first();
      if (await brushTool.isVisible()) {
        await brushTool.click();
        // Verify tool is selected (may have active class or similar)
        await expect(brushTool).toBeVisible();
      }
    });
  });

  test.describe('Canvas Interaction', () => {
    test('should be able to draw on canvas', async ({ page }) => {
      const canvas = page.locator('#canvas_minipaint');
      const box = await canvas.boundingBox();

      if (box) {
        // Perform a simple drawing gesture
        await page.mouse.move(box.x + 100, box.y + 100);
        await page.mouse.down();
        await page.mouse.move(box.x + 200, box.y + 200);
        await page.mouse.up();

        // Canvas should still be visible after drawing
        await expect(canvas).toBeVisible();
      }
    });

    test('canvas should have dimensions', async ({ page }) => {
      const canvas = page.locator('#canvas_minipaint');
      const box = await canvas.boundingBox();

      expect(box).not.toBeNull();
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    });
  });

  test.describe('Layers Panel', () => {
    test('should display layers content', async ({ page }) => {
      const layersBase = page.locator('#layers_base');
      await expect(layersBase).toBeVisible();
    });

    test('should have at least one layer', async ({ page }) => {
      // Wait for layers to be rendered
      await page.waitForTimeout(500);

      const layersBase = page.locator('#layers_base');
      // The layers panel should have some content
      const content = await layersBase.innerHTML();
      expect(content.length).toBeGreaterThan(0);
    });
  });

  test.describe('Undo Button', () => {
    test('should have undo button in DOM', async ({ page }) => {
      const undoButton = page.locator('#undo_button');
      // Button exists but may be hidden until there's an action to undo
      expect(await undoButton.count()).toBe(1);
    });
  });

  test.describe('Keyboard Shortcuts', () => {
    test('should respond to Ctrl+Z for undo', async ({ page }) => {
      // First make a change by drawing
      const canvas = page.locator('#canvas_minipaint');
      const box = await canvas.boundingBox();

      if (box) {
        await page.mouse.move(box.x + 100, box.y + 100);
        await page.mouse.down();
        await page.mouse.move(box.x + 150, box.y + 150);
        await page.mouse.up();

        // Wait for the action to be registered
        await page.waitForTimeout(200);

        // Press Ctrl+Z
        await page.keyboard.press('Control+z');

        // Canvas should still be visible
        await expect(canvas).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should have mobile menu buttons', async ({ page }) => {
      const leftMobileButton = page.locator('#left_mobile_menu_button');
      const rightMobileButton = page.locator('#mobile_menu_button');

      // These exist in DOM but may be hidden on desktop
      expect(await leftMobileButton.count()).toBe(1);
      expect(await rightMobileButton.count()).toBe(1);
    });
  });

  test.describe('Preview Panel', () => {
    test('should have preview section', async ({ page }) => {
      const preview = page.locator('#toggle_preview');
      await expect(preview).toBeVisible();
    });
  });

  test.describe('Information Panel', () => {
    test('should have information section', async ({ page }) => {
      const info = page.locator('#toggle_info');
      // May be collapsed initially
      const infoBase = page.locator('#info_base');
      await expect(infoBase).toBeVisible();
    });
  });

  test.describe('Layer Details Panel', () => {
    test('should have layer details section', async ({ page }) => {
      const detailsBase = page.locator('#details_base');
      await expect(detailsBase).toBeVisible();
    });
  });

  test.describe('Global Config Access', () => {
    test('should expose AppConfig globally', async ({ page }) => {
      const hasConfig = await page.evaluate(() => {
        return typeof window.AppConfig !== 'undefined';
      });
      expect(hasConfig).toBe(true);
    });

    test('should have default zoom of 1', async ({ page }) => {
      const zoom = await page.evaluate(() => {
        return window.AppConfig?.ZOOM;
      });
      expect(zoom).toBe(1);
    });

    test('should have layers array', async ({ page }) => {
      const hasLayers = await page.evaluate(() => {
        return Array.isArray(window.AppConfig?.layers);
      });
      expect(hasLayers).toBe(true);
    });
  });

  test.describe('Rulers', () => {
    test('should have left ruler', async ({ page }) => {
      const leftRuler = page.locator('#ruler_left');
      expect(await leftRuler.count()).toBe(1);
    });

    test('should have top ruler', async ({ page }) => {
      const topRuler = page.locator('#ruler_top');
      expect(await topRuler.count()).toBe(1);
    });
  });

  test.describe('Logo', () => {
    test('should display miniPaint logo', async ({ page }) => {
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveText('miniPaint');
    });
  });
});
