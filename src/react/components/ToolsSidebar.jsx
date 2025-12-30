import React from 'react';
import { useApp } from '../contexts/AppContext';

// Tool definitions
const tools = [
  { name: 'select', title: 'Select object tool', icon: 'select' },
  { name: 'selection', title: 'Selection', icon: 'selection' },
  { name: 'brush', title: 'Brush', icon: 'brush' },
  { name: 'pencil', title: 'Pencil', icon: 'pencil' },
  { name: 'pick_color', title: 'Color Picker', icon: 'pick_color' },
  { name: 'erase', title: 'Eraser', icon: 'erase' },
  { name: 'magic_erase', title: 'Magic Eraser Tool', icon: 'magic_erase' },
  { name: 'fill', title: 'Fill', icon: 'fill' },
  { name: 'shape', title: 'Shapes (H)', icon: 'shape' },
  { name: 'text', title: 'Text', icon: 'text' },
  { name: 'gradient', title: 'Gradient', icon: 'gradient' },
  { name: 'clone', title: 'Clone', icon: 'clone' },
  { name: 'crop', title: 'Crop', icon: 'crop' },
  { name: 'blur', title: 'Blur', icon: 'blur' },
  { name: 'sharpen', title: 'Sharpen', icon: 'sharpen' },
  { name: 'desaturate', title: 'Desaturate', icon: 'desaturate' },
  { name: 'bulge_pinch', title: 'Bulge/Pinch Tool', icon: 'bulge_pinch' },
  { name: 'media', title: 'Search Images', icon: 'media' },
  { name: 'animation', title: 'Animation', icon: 'animation' },
];

function ToolButton({ tool, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`item ${isActive ? 'active' : ''}`}
      title={tool.title}
      data-tool={tool.name}
      onClick={onClick}
    >
      <span className={`icon icon-${tool.icon}`}></span>
      <span className="sr_only">{tool.title}</span>
    </button>
  );
}

export default function ToolsSidebar() {
  const { activeTool, selectTool, config } = useApp();

  const handleToolClick = (tool) => {
    const toolConfig = config.TOOLS.find(t => t.name === tool.name);
    if (toolConfig) {
      selectTool(toolConfig);
    }
  };

  return (
    <div className="sidebar_left" id="tools_container">
      <div className="tools-list">
        {tools.map((tool) => (
          <ToolButton
            key={tool.name}
            tool={tool}
            isActive={activeTool?.name === tool.name}
            onClick={() => handleToolClick(tool)}
          />
        ))}
      </div>
    </div>
  );
}
