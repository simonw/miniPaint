import React from 'react';
import { useApp } from '../contexts/AppContext';

export default function Submenu() {
  const { activeTool, undoStack, undo } = useApp();

  return (
    <div className="submenu">
      <a className="logo" href="#">miniPaint</a>
      <div className="block attributes" id="action_attributes">
        {activeTool && (
          <span className="tool-info">
            Tool: {activeTool.title || activeTool.name}
          </span>
        )}
      </div>
      <button
        className="undo_button"
        id="undo_button"
        type="button"
        onClick={undo}
        style={{ opacity: undoStack.length > 0 ? 1 : 0.5 }}
      >
        <span className="sr_only">Undo</span>
      </button>
    </div>
  );
}
