// Jest test setup file
import '@testing-library/dom';

// Mock canvas for jsdom
class MockCanvasRenderingContext2D {
  constructor() {
    this.fillStyle = '#000000';
    this.strokeStyle = '#000000';
    this.lineWidth = 1;
    this.lineCap = 'butt';
    this.lineJoin = 'miter';
    this.font = '10px sans-serif';
    this.textAlign = 'start';
    this.textBaseline = 'alphabetic';
    this.globalAlpha = 1;
    this.globalCompositeOperation = 'source-over';
    this.shadowBlur = 0;
    this.shadowColor = 'rgba(0, 0, 0, 0)';
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.canvas = null;
  }

  save() {}
  restore() {}
  scale() {}
  rotate() {}
  translate() {}
  transform() {}
  setTransform() {}
  resetTransform() {}
  createLinearGradient() { return { addColorStop: () => {} }; }
  createRadialGradient() { return { addColorStop: () => {} }; }
  createPattern() { return null; }
  clearRect() {}
  fillRect() {}
  strokeRect() {}
  beginPath() {}
  closePath() {}
  moveTo() {}
  lineTo() {}
  bezierCurveTo() {}
  quadraticCurveTo() {}
  arc() {}
  arcTo() {}
  ellipse() {}
  rect() {}
  fill() {}
  stroke() {}
  drawFocusIfNeeded() {}
  clip() {}
  isPointInPath() { return false; }
  isPointInStroke() { return false; }
  fillText() {}
  strokeText() {}
  measureText(text) { return { width: text.length * 6 }; }
  drawImage() {}
  createImageData(w, h) { return { data: new Uint8ClampedArray(w * h * 4), width: w, height: h }; }
  getImageData(x, y, w, h) { return { data: new Uint8ClampedArray(w * h * 4), width: w, height: h }; }
  putImageData() {}
  setLineDash() {}
  getLineDash() { return []; }
}

HTMLCanvasElement.prototype.getContext = function(type) {
  if (type === '2d') {
    const ctx = new MockCanvasRenderingContext2D();
    ctx.canvas = this;
    return ctx;
  }
  return null;
};

HTMLCanvasElement.prototype.toDataURL = function() {
  return 'data:image/png;base64,';
};

HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

// Mock window.requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock alert/confirm/prompt
global.alert = jest.fn();
global.confirm = jest.fn(() => true);
global.prompt = jest.fn(() => '');

// Mock Image
class MockImage {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.src = '';
  }
}
global.Image = MockImage;

// Mock FileReader
class MockFileReader {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }
  readAsDataURL() {
    setTimeout(() => {
      this.result = 'data:image/png;base64,';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
  readAsText() {
    setTimeout(() => {
      this.result = '';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
}
global.FileReader = MockFileReader;
