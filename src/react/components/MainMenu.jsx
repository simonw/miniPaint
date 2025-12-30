import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';

// Menu definition matching the original config-menu.js
const menuDefinition = [
  {
    name: 'File',
    children: [
      { name: 'New', target: 'file/new.new' },
      { divider: true },
      { name: 'Open File', shortcut: 'O', target: 'file/open.open_file' },
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
    ]
  },
  {
    name: 'Layer',
    children: [
      { name: 'New Layer', target: 'layer/new.new' },
      { name: 'Duplicate', target: 'layer/duplicate.duplicate' },
      { name: 'Delete', target: 'layer/delete.delete' },
      { divider: true },
      { name: 'Flatten Image', target: 'layer/flatten.flatten' },
    ]
  },
  {
    name: 'Effects',
    children: [
      { name: 'Grayscale', target: 'effects/grayscale.grayscale' },
      { name: 'Blur', target: 'effects/blur.blur' },
      { name: 'Sharpen', target: 'effects/sharpen.sharpen' },
      { divider: true },
      { name: 'Black and White', target: 'effects/black_and_white.black_and_white' },
      { name: 'Invert', target: 'effects/invert.invert' },
      { name: 'Sepia', target: 'effects/sepia.sepia' },
    ]
  },
  {
    name: 'Tools',
    children: [
      { name: 'Settings', target: 'tools/settings.settings' },
      { divider: true },
      { name: 'Zoom', target: 'tools/zoom.zoom' },
      { name: 'Full Screen', target: 'tools/full_screen.full_screen' },
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

export default function MainMenu() {
  const [openMenu, setOpenMenu] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 30, left: 0 });
  const menuRef = useRef(null);
  const { undo, redo } = useApp();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (index, e) => {
    if (openMenu === index) {
      setOpenMenu(null);
    } else {
      const rect = e.target.getBoundingClientRect();
      setDropdownPosition({ top: 30, left: rect.left });
      setOpenMenu(index);
    }
  };

  const handleItemClick = (item) => {
    console.log('Menu action:', item.target);
    if (item.target === 'edit/undo.undo') {
      undo();
    } else if (item.target === 'edit/redo.redo') {
      redo();
    }
    setOpenMenu(null);
  };

  return (
    <nav aria-label="Main Menu" className="main_menu" id="main_menu" ref={menuRef}>
      <ul className="menu_bar" role="menubar">
        {menuDefinition.map((menu, index) => (
          <li key={index}>
            <a
              href="#"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={openMenu === index}
              onClick={(e) => { e.preventDefault(); handleMenuClick(index, e); }}
              onMouseEnter={(e) => openMenu !== null && handleMenuClick(index, e)}
            >
              <span className="name trn">{menu.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {openMenu !== null && (
        <ul
          className="menu_dropdown"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          {menuDefinition[openMenu].children.map((item, idx) => (
            item.divider ? (
              <li key={idx} role="presentation"><hr /></li>
            ) : (
              <li key={idx}>
                <a
                  href="#"
                  role="menuitem"
                  onClick={(e) => { e.preventDefault(); handleItemClick(item); }}
                >
                  <span className="name">
                    <span className="trn">{item.name}</span>
                  </span>
                  {item.shortcut && (
                    <span className="shortcut">{item.shortcut}</span>
                  )}
                </a>
              </li>
            )
          ))}
        </ul>
      )}
    </nav>
  );
}
