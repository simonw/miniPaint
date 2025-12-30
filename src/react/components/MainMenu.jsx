import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

// Menu definition matching the original config-menu.js
const menuDefinition = [
  {
    name: 'File',
    children: [
      { name: 'New', target: 'file/new.new' },
      { divider: true },
      {
        name: 'Open',
        children: [
          { name: 'Open File', shortcut: 'O', target: 'file/open.open_file' },
          { name: 'Open Directory', target: 'file/open.open_dir' },
          { name: 'Open from Webcam', target: 'file/open.open_webcam' },
          { name: 'Open URL', target: 'file/open.open_url' },
          { name: 'Open Data URL', target: 'file/open.open_data_url' },
        ]
      },
      { divider: true },
      { name: 'Export', shortcut: 'S', target: 'file/save.export' },
      { name: 'Save As', shortcut: 'Shift + S', target: 'file/save.save' },
      { name: 'Print', shortcut: 'Ctrl+P', target: 'file/print.print' },
    ]
  },
  {
    name: 'Edit',
    children: [
      { name: 'Undo', shortcut: 'Ctrl+Z', target: 'edit/undo.undo' },
      { name: 'Redo', shortcut: 'Ctrl+Y', target: 'edit/redo.redo' },
      { divider: true },
      { name: 'Cut', shortcut: 'Ctrl+X', target: 'edit/cut.cut' },
      { name: 'Copy', shortcut: 'Ctrl+C', target: 'edit/copy.copy' },
      { name: 'Paste', shortcut: 'Ctrl+V', target: 'edit/paste.paste' },
      { divider: true },
      { name: 'Select All', shortcut: 'Ctrl+A', target: 'edit/selection.select_all' },
      { name: 'Delete Selection', target: 'edit/selection.delete' },
    ]
  },
  {
    name: 'Image',
    children: [
      { name: 'Information', target: 'image/information.info' },
      { divider: true },
      { name: 'Resize', target: 'image/resize.resize' },
      { name: 'Rotate', target: 'image/rotate.rotate' },
      { name: 'Flip', target: 'image/flip.flip' },
      { name: 'Crop', target: 'image/crop.crop' },
      { name: 'Trim', target: 'image/trim.trim' },
      { divider: true },
      { name: 'Color Corrections', target: 'image/color_corrections.color_corrections' },
      { name: 'Auto Adjust', target: 'image/auto_adjust.auto_adjust' },
      { divider: true },
      { name: 'Histogram', target: 'image/histogram.histogram' },
      { name: 'Grid', target: 'image/grid.grid' },
    ]
  },
  {
    name: 'Layer',
    children: [
      { name: 'New Layer', target: 'layer/new.new' },
      { name: 'Duplicate', target: 'layer/duplicate.duplicate' },
      { name: 'Delete', target: 'layer/delete.delete' },
      { divider: true },
      { name: 'Merge Down', target: 'layer/merge.merge' },
      { name: 'Flatten Image', target: 'layer/flatten.flatten' },
      { divider: true },
      { name: 'Rename', target: 'layer/rename.rename' },
      { name: 'Clear', target: 'layer/clear.clear' },
    ]
  },
  {
    name: 'Effects',
    children: [
      {
        name: 'Common',
        children: [
          { name: 'Grayscale', target: 'effects/grayscale.grayscale' },
          { name: 'Blur', target: 'effects/blur.blur' },
          { name: 'Sharpen', target: 'effects/sharpen.sharpen' },
          { name: 'Brightness/Contrast', target: 'effects/brightness_contrast.brightness_contrast' },
        ]
      },
      {
        name: 'Instagram Filters',
        children: [
          { name: '1977', target: 'effects/instagram/1977.1977' },
          { name: 'Aden', target: 'effects/instagram/aden.aden' },
          { name: 'Clarendon', target: 'effects/instagram/clarendon.clarendon' },
          { name: 'Gingham', target: 'effects/instagram/gingham.gingham' },
        ]
      },
      { divider: true },
      { name: 'Black and White', target: 'effects/black_and_white.black_and_white' },
      { name: 'Invert', target: 'effects/invert.invert' },
      { name: 'Sepia', target: 'effects/sepia.sepia' },
      { name: 'Vintage', target: 'effects/vintage.vintage' },
      { name: 'Vignette', target: 'effects/vignette.vignette' },
    ]
  },
  {
    name: 'Tools',
    children: [
      { name: 'Settings', target: 'tools/settings.settings' },
      { divider: true },
      { name: 'Zoom', target: 'tools/zoom.zoom' },
      { name: 'Full Screen', target: 'tools/full_screen.full_screen' },
      { name: 'Guides', target: 'tools/guides.guides' },
      { name: 'Ruler', target: 'tools/ruler.ruler' },
      { divider: true },
      { name: 'Search', shortcut: 'F', target: 'tools/search.search' },
    ]
  },
  {
    name: 'Help',
    children: [
      { name: 'Keyboard Shortcuts', target: 'help/shortcuts.shortcuts' },
      { name: 'About', target: 'help/about.about' },
    ]
  }
];

function MenuItem({ item, level = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const { undo, redo } = useApp();

  const handleClick = (e) => {
    if (item.children) {
      setIsOpen(!isOpen);
    } else if (item.target) {
      // Handle menu action
      console.log('Menu action:', item.target);
      if (item.target === 'edit/undo.undo') {
        undo();
      } else if (item.target === 'edit/redo.redo') {
        redo();
      }
      // Close all menus
      document.querySelectorAll('.submenu-open').forEach(el => {
        el.classList.remove('submenu-open');
      });
    }
  };

  if (item.divider) {
    return <div className="menu-divider" />;
  }

  return (
    <div
      className={`menu-item ${item.children ? 'has-children' : ''} ${isOpen ? 'submenu-open' : ''}`}
      onMouseEnter={() => item.children && setIsOpen(true)}
      onMouseLeave={() => item.children && setIsOpen(false)}
    >
      <button
        type="button"
        className="menu-button"
        onClick={handleClick}
      >
        <span className="menu-label">{item.name}</span>
        {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
        {item.children && <span className="arrow">{'>'}</span>}
      </button>
      {item.children && isOpen && (
        <div className={`submenu level-${level}`}>
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MainMenu() {
  return (
    <nav aria-label="Main Menu" className="main_menu" id="main_menu">
      <ul className="menu-list">
        {menuDefinition.map((item, index) => (
          <li key={index} className="menu-top-item">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
