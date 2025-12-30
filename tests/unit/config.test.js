/**
 * Unit tests for config module
 */

import config from '../../src/js/config';

describe('Config', () => {
  describe('Default values', () => {
    test('should have correct transparency defaults', () => {
      expect(config.TRANSPARENCY).toBe(false);
      expect(config.TRANSPARENCY_TYPE).toBe('squares');
    });

    test('should have correct language default', () => {
      expect(config.LANG).toBe('en');
    });

    test('should have correct color defaults', () => {
      expect(config.COLOR).toBe('#008000');
      expect(config.ALPHA).toBe(255);
    });

    test('should have correct zoom default', () => {
      expect(config.ZOOM).toBe(1);
    });

    test('should have snap enabled by default', () => {
      expect(config.SNAP).toBe(true);
    });

    test('should have guides enabled by default', () => {
      expect(config.guides_enabled).toBe(true);
    });

    test('should have ruler inactive by default', () => {
      expect(config.ruler_active).toBe(false);
    });

    test('should have autoresize enabled by default', () => {
      expect(config.enable_autoresize_by_default).toBe(true);
    });
  });

  describe('Layers', () => {
    test('should have empty layers array', () => {
      expect(Array.isArray(config.layers)).toBe(true);
    });

    test('should have null layer', () => {
      expect(config.layer).toBe(null);
    });
  });

  describe('Rendering', () => {
    test('should have need_render set to false', () => {
      expect(config.need_render).toBe(false);
    });

    test('should have need_render_changed_params set to false', () => {
      expect(config.need_render_changed_params).toBe(false);
    });
  });

  describe('Themes', () => {
    test('should have theme options', () => {
      expect(config.themes).toContain('dark');
      expect(config.themes).toContain('light');
      expect(config.themes).toContain('green');
    });
  });

  describe('Fonts', () => {
    test('should have default fonts', () => {
      expect(config.FONTS).toContain('Arial');
      expect(config.FONTS).toContain('Verdana');
      expect(config.FONTS).toContain('Roboto');
    });

    test('should have reasonable number of fonts', () => {
      expect(config.FONTS.length).toBeGreaterThan(10);
    });
  });

  describe('Tools', () => {
    test('should have tools array', () => {
      expect(Array.isArray(config.TOOLS)).toBe(true);
    });

    test('should have essential tools', () => {
      const toolNames = config.TOOLS.map(t => t.name);
      expect(toolNames).toContain('brush');
      expect(toolNames).toContain('pencil');
      expect(toolNames).toContain('text');
      expect(toolNames).toContain('fill');
      expect(toolNames).toContain('erase');
      expect(toolNames).toContain('select');
    });

    test('should have default tool set', () => {
      expect(config.TOOL).toBeDefined();
      expect(config.TOOL.name).toBe('brush');
    });

    test('each tool should have name and attributes', () => {
      config.TOOLS.forEach(tool => {
        expect(tool.name).toBeDefined();
        expect(typeof tool.name).toBe('string');
        expect(tool.attributes).toBeDefined();
      });
    });
  });

  describe('API keys', () => {
    test('should have pixabay key', () => {
      expect(config.pixabay_key).toBeDefined();
      expect(typeof config.pixabay_key).toBe('string');
    });

    test('should have google webfonts key', () => {
      expect(config.google_webfonts_key).toBeDefined();
      expect(typeof config.google_webfonts_key).toBe('string');
    });

    test('should have safe search option', () => {
      expect(typeof config.safe_search_can_be_disabled).toBe('boolean');
    });
  });

  describe('Swatches', () => {
    test('should have swatches object with default key', () => {
      expect(config.swatches).toBeDefined();
      expect(Array.isArray(config.swatches.default)).toBe(true);
    });
  });

  describe('User fonts', () => {
    test('should have user_fonts object', () => {
      expect(config.user_fonts).toBeDefined();
      expect(typeof config.user_fonts).toBe('object');
    });
  });

  describe('Guides', () => {
    test('should have empty guides array', () => {
      expect(Array.isArray(config.guides)).toBe(true);
    });
  });

  describe('Mouse', () => {
    test('should have mouse object', () => {
      expect(config.mouse).toBeDefined();
      expect(typeof config.mouse).toBe('object');
    });

    test('should have null mouse_lock', () => {
      expect(config.mouse_lock).toBe(null);
    });
  });
});
