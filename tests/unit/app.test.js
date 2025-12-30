/**
 * Unit tests for app module
 */

import app from '../../src/js/app';

describe('App module', () => {
  describe('Initial state', () => {
    test('should export object with null singletons', () => {
      expect(app).toBeDefined();
      expect(typeof app).toBe('object');
    });

    test('should have GUI property', () => {
      expect(app).toHaveProperty('GUI');
    });

    test('should have Tools property', () => {
      expect(app).toHaveProperty('Tools');
    });

    test('should have Layers property', () => {
      expect(app).toHaveProperty('Layers');
    });

    test('should have Config property', () => {
      expect(app).toHaveProperty('Config');
    });

    test('should have State property', () => {
      expect(app).toHaveProperty('State');
    });

    test('should have FileOpen property', () => {
      expect(app).toHaveProperty('FileOpen');
    });

    test('should have FileSave property', () => {
      expect(app).toHaveProperty('FileSave');
    });

    test('should have Actions property', () => {
      expect(app).toHaveProperty('Actions');
    });
  });

  describe('Singleton pattern', () => {
    test('should allow setting GUI singleton', () => {
      const mockGUI = { init: jest.fn() };
      app.GUI = mockGUI;
      expect(app.GUI).toBe(mockGUI);
      app.GUI = null; // Reset
    });

    test('should allow setting Config singleton', () => {
      const mockConfig = { ZOOM: 1 };
      app.Config = mockConfig;
      expect(app.Config).toBe(mockConfig);
      app.Config = null; // Reset
    });
  });
});
