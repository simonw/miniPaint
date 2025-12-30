import React, { useEffect } from 'react';
import { AppProvider, useApp } from '../contexts/AppContext';
import MainMenu from './MainMenu';
import Submenu from './Submenu';
import ToolsSidebar from './ToolsSidebar';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

function MobileMenu() {
  return (
    <div className="mobile_menu">
      <button className="left_mobile_menu" id="left_mobile_menu_button" type="button">
        <span className="sr_only">Toggle Menu</span>
      </button>
      <button className="right_mobile_menu" id="mobile_menu_button" type="button">
        <span className="sr_only">Toggle Menu</span>
      </button>
    </div>
  );
}

function KeyboardShortcuts() {
  const { undo, redo, selectTool, config } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if we're in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Undo: Ctrl+Z
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        redo();
      }

      // Tool shortcuts
      if (!e.ctrlKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            selectTool(config.TOOLS.find(t => t.name === 'brush'));
            break;
          case 'p':
            selectTool(config.TOOLS.find(t => t.name === 'pencil'));
            break;
          case 'e':
            selectTool(config.TOOLS.find(t => t.name === 'erase'));
            break;
          case 'g':
            selectTool(config.TOOLS.find(t => t.name === 'fill'));
            break;
          case 't':
            selectTool(config.TOOLS.find(t => t.name === 'text'));
            break;
          case 'v':
            selectTool(config.TOOLS.find(t => t.name === 'select'));
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectTool, config.TOOLS]);

  return null;
}

function AppContent() {
  return (
    <>
      <KeyboardShortcuts />
      <div className="wrapper">
        <MainMenu />
        <Submenu />
        <ToolsSidebar />
        <Canvas />
        <Sidebar />
      </div>
      <MobileMenu />
      <div className="hidden" id="tmp"></div>
      <div id="popups"></div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
