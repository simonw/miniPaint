/**
 * Unit tests for Helper_class
 */

import Helper_class from '../../src/js/libs/helpers';

describe('Helper_class', () => {
  let helper;

  beforeEach(() => {
    helper = new Helper_class();
  });

  describe('Color conversion', () => {
    describe('hexToRgb', () => {
      test('should convert 6-digit hex to RGB', () => {
        expect(helper.hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 255 });
        expect(helper.hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0, a: 255 });
        expect(helper.hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255, a: 255 });
        expect(helper.hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 255 });
        expect(helper.hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 255 });
      });

      test('should convert 3-digit hex to RGB', () => {
        expect(helper.hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 255 });
        expect(helper.hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0, a: 255 });
        expect(helper.hexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255, a: 255 });
      });

      test('should work without hash', () => {
        expect(helper.hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 255 });
      });
    });

    describe('rgbToHex', () => {
      test('should convert RGB to hex', () => {
        expect(helper.rgbToHex(255, 0, 0)).toBe('#ff0000');
        expect(helper.rgbToHex(0, 255, 0)).toBe('#00ff00');
        expect(helper.rgbToHex(0, 0, 255)).toBe('#0000ff');
        expect(helper.rgbToHex(255, 255, 255)).toBe('#ffffff');
        expect(helper.rgbToHex(0, 0, 0)).toBe('#000000');
      });

      test('should throw on invalid color component', () => {
        expect(() => helper.rgbToHex(256, 0, 0)).toThrow('Invalid color component');
      });
    });

    describe('rgbToHsl', () => {
      test('should convert RGB to HSL', () => {
        const result = helper.rgbToHsl(255, 0, 0);
        expect(result.h).toBeCloseTo(0, 2);
        expect(result.s).toBeCloseTo(1, 2);
        expect(result.l).toBeCloseTo(0.5, 2);
      });

      test('should handle achromatic colors', () => {
        const result = helper.rgbToHsl(128, 128, 128);
        expect(result.h).toBe(0);
        expect(result.s).toBe(0);
        expect(result.l).toBeCloseTo(0.5, 1);
      });
    });

    describe('hslToRgb', () => {
      test('should convert HSL to RGB', () => {
        expect(helper.hslToRgb(0, 1, 0.5)).toEqual({ r: 255, g: 0, b: 0 });
      });

      test('should handle achromatic colors', () => {
        const result = helper.hslToRgb(0, 0, 0.5);
        expect(result.r).toBe(128);
        expect(result.g).toBe(128);
        expect(result.b).toBe(128);
      });
    });

    describe('rgbToHsv and hsvToRgb', () => {
      test('should be inverse operations', () => {
        const originalRgb = { r: 100, g: 150, b: 200 };
        const hsv = helper.rgbToHsv(originalRgb.r, originalRgb.g, originalRgb.b);
        const backRgb = helper.hsvToRgb(hsv.h, hsv.s, hsv.v);

        expect(Math.round(backRgb.r)).toBeCloseTo(originalRgb.r, 0);
        expect(Math.round(backRgb.g)).toBeCloseTo(originalRgb.g, 0);
        expect(Math.round(backRgb.b)).toBeCloseTo(originalRgb.b, 0);
      });
    });
  });

  describe('String utilities', () => {
    describe('strpos', () => {
      test('should find substring position', () => {
        expect(helper.strpos('hello world', 'world')).toBe(6);
        expect(helper.strpos('hello world', 'hello')).toBe(0);
      });

      test('should return false if not found', () => {
        expect(helper.strpos('hello world', 'foo')).toBe(false);
      });

      test('should support offset', () => {
        expect(helper.strpos('hello hello', 'hello', 1)).toBe(6);
      });
    });

    describe('ucfirst', () => {
      test('should capitalize first letter', () => {
        expect(helper.ucfirst('hello')).toBe('Hello');
        expect(helper.ucfirst('world')).toBe('World');
      });
    });

    describe('escapeHtml', () => {
      test('should escape HTML entities', () => {
        expect(helper.escapeHtml('<div>')).toBe('&lt;div&gt;');
        expect(helper.escapeHtml('"test"')).toBe('&quot;test&quot;');
        expect(helper.escapeHtml("'test'")).toBe("&#039;test&#039;");
        expect(helper.escapeHtml('a & b')).toBe('a &amp; b');
      });
    });
  });

  describe('Number utilities', () => {
    describe('isNumeric', () => {
      test('should return true for numbers', () => {
        expect(helper.isNumeric(123)).toBe(true);
        expect(helper.isNumeric('123')).toBe(true);
        expect(helper.isNumeric(12.5)).toBe(true);
        expect(helper.isNumeric('12.5')).toBe(true);
      });

      test('should return false for non-numbers', () => {
        expect(helper.isNumeric('abc')).toBe(false);
        expect(helper.isNumeric(NaN)).toBe(false);
        expect(helper.isNumeric(Infinity)).toBe(false);
      });
    });

    describe('getRandomInt', () => {
      test('should return number within range', () => {
        for (let i = 0; i < 100; i++) {
          const result = helper.getRandomInt(1, 10);
          expect(result).toBeGreaterThanOrEqual(1);
          expect(result).toBeLessThanOrEqual(10);
        }
      });
    });

    describe('hex', () => {
      test('should convert number to 2-digit hex', () => {
        expect(helper.hex(0)).toBe('00');
        expect(helper.hex(15)).toBe('0f');
        expect(helper.hex(255)).toBe('ff');
        expect(helper.hex(16)).toBe('10');
      });
    });

    describe('number_format', () => {
      test('should format numbers with specified decimals', () => {
        expect(helper.number_format(123.456, 2)).toBe(123.46);
        expect(helper.number_format(123.456, 0)).toBe(123);
      });
    });
  });

  describe('Unit conversion', () => {
    describe('get_user_unit', () => {
      test('should return pixels as-is', () => {
        expect(helper.get_user_unit(100, 'pixels', 72)).toBe(100);
      });

      test('should convert pixels to inches', () => {
        expect(helper.get_user_unit(72, 'inches', 72)).toBeCloseTo(1, 2);
      });

      test('should convert pixels to centimeters', () => {
        expect(helper.get_user_unit(72, 'centimeters', 72)).toBeCloseTo(2.54, 2);
      });
    });

    describe('get_internal_unit', () => {
      test('should return pixels as-is', () => {
        expect(helper.get_internal_unit(100, 'pixels', 72)).toBe(100);
      });

      test('should convert inches to pixels', () => {
        expect(helper.get_internal_unit(1, 'inches', 72)).toBe(72);
      });

      test('should convert centimeters to pixels', () => {
        expect(helper.get_internal_unit(2.54, 'centimeters', 72)).toBe(72);
      });
    });
  });

  describe('Timer utilities', () => {
    test('timer_start and timer_end should work', () => {
      helper.timer_start();
      const result = helper.timer_end('test', false);
      expect(result).toMatch(/\d+(\.\d+)? s/);
    });
  });

  describe('font_pixel_to_height', () => {
    test('should convert font pixel size to height', () => {
      expect(helper.font_pixel_to_height(16)).toBe(12);
      expect(helper.font_pixel_to_height(100)).toBe(75);
    });
  });
});
