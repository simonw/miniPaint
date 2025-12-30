# miniPaint

Online image editor lets you create and edit images using HTML5 technologies. No need to buy, download, install, or have outdated flash. No ads. Key features: layers, filters, open source Photoshop alternative.

miniPaint operates directly in the browser. You can create images by pasting from the clipboard (ctrl+v) or uploading from the computer (_using menu or drag & drop_). Nothing will be sent to any server. Everything stays in your browser. 

## URL:
**https://viliusle.github.io/miniPaint/**

## Preview:
![miniPaint](https://raw.githubusercontent.com/viliusle/miniPaint/master/images/preview.gif)
(generated using miniPaint)

**Change log:** [/miniPaint/releases](https://github.com/viliusle/miniPaint/releases)

## Browser Support
- Chrome
- Firefox
- Opera
- Edge
- Safari
- Yandex

## Features

**Files**: open images, directories, URLs, data URLs, drag and drop, save (PNG, JPG, BMP, WEBP, animated GIF, TIFF, JSON (layers data), print.

**Edit**: undo, cut, copy, paste, selection, paste from the clipboard.

**Image**: information, EXIF, trim, zoom, resize (Hermite resample, default resize), rotate, flip, color corrections (brightness, contrast, hue, saturation, luminance), automatic color adjustment, grid, histogram, negative.

**Layers**: multi-layer system, differences, merging, flattening, transparency support.

**Effects**: black and white, blur (box, gaussian, stack, zoom), bulge/pinch, denoise, desaturation, dither, dot screen, edge, emboss, enrich, gamma, grains, grayscale, heatmap, jpg compression, mosaic, oil, sepia, sharpen, solarize, tilt shift, vignette, vibrance, vintage, blueprint, night vision, pencil, also instagram filters: 1977, aden, clarendon, gingham, inkwell, lo-fi, toaster, valencia, x-pro ii.

**Tools**: pencil, brush, magic wand, eraser, fill, color picker, letter, crop, blur, sharpener, desaturation, clone, borders, sprites, keypoints, color zoom, change color, restore transparency, content fill. 

**Help**: keyboard shortcuts, translation.

## Embed
To embed this app on another page, use the following HTML code:

    <iframe style="box-sizing:border-box; width:100%; height:100vh;" id="miniPaint" src="https://viliusle.github.io/miniPaint/" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Build instructions
See [Wiki > Build instructions](https://github.com/viliusle/miniPaint/wiki/Build-instructions)

## Testing

miniPaint includes comprehensive tests using Jest for unit tests and Playwright for end-to-end tests.

### Install Dependencies
```bash
npm install
```

### Run Unit Tests
```bash
npm test                 # Run all unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### Run E2E Tests
```bash
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Run E2E tests with interactive UI
```

### Run All Tests
```bash
npm run test:all         # Run both unit and E2E tests
```

### Test Structure
- `tests/unit/` - Unit tests for core functionality (helpers, config, app modules)
- `tests/e2e/` - End-to-end browser tests (page load, menu navigation, canvas interaction, etc.)

### Testing React Version
```bash
npm run test:e2e:react   # Run E2E tests against React version
```

## React Version

miniPaint includes a full React rewrite alongside the original vanilla JavaScript implementation. Both versions pass the same test suite.

### Running the React Version
```bash
npm run dev:react        # Build React bundle
npm run server:react     # Start React dev server (opens at http://localhost:8081/index-react.html)
```

### Building for Production
```bash
npm run build:react      # Build React production bundle
npm run build:all        # Build both original and React bundles
```

### React Project Structure
```
src/react/
├── main.jsx             # React entry point
├── components/
│   ├── App.jsx          # Main application component
│   ├── MainMenu.jsx     # Menu navigation
│   ├── ToolsSidebar.jsx # Drawing tools
│   ├── Canvas.jsx       # Main canvas component
│   ├── Sidebar.jsx      # Right sidebar (colors, layers, etc.)
│   └── Submenu.jsx      # Top submenu bar
└── contexts/
    └── AppContext.jsx   # React context for state management
```

## Wiki
See [Wiki](https://github.com/viliusle/miniPaint/wiki)

## Contributors
<a align="center" href="https://github.com/viliusle/miniPaint/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=viliusle/miniPaint" />
</a>

## License
MIT License

## Support
Please use the GitHub issues for support, feature requests and bug reports, or contact us by sending an email to www.viliusl@gmail.com.
