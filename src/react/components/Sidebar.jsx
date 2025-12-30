import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

// Preview Panel Component
function PreviewPanel() {
  return (
    <div className="preview block">
      <h2 className="trn toggle" data-target="toggle_preview">Preview</h2>
      <div id="toggle_preview">
        <canvas id="canvas_preview" width="200" height="150" style={{ background: '#fff' }}></canvas>
      </div>
    </div>
  );
}

// Colors Panel Component
function ColorsPanel() {
  const { config, updateConfig } = useApp();
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (e) => {
    updateConfig({ COLOR: e.target.value });
  };

  const handleAlphaChange = (e) => {
    updateConfig({ ALPHA: parseInt(e.target.value, 10) });
  };

  return (
    <div className="colors block">
      <h2 className="trn toggle" data-target="toggle_colors">Colors</h2>
      <div className="content" id="toggle_colors">
        <div className="color-picker-container">
          <label>
            Color:
            <input
              type="color"
              value={config.COLOR}
              onChange={handleColorChange}
              style={{ width: '50px', height: '30px', marginLeft: '10px' }}
            />
          </label>
        </div>
        <div className="alpha-slider" style={{ marginTop: '10px' }}>
          <label>
            Alpha: {config.ALPHA}
            <input
              type="range"
              min="0"
              max="255"
              value={config.ALPHA}
              onChange={handleAlphaChange}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// Information Panel Component
function InformationPanel() {
  const { config } = useApp();

  return (
    <div className="block" id="info_base">
      <h2 className="trn toggle toggle-full" data-target="toggle_info">Information</h2>
      <div className="content" id="toggle_info">
        <div className="info-row">
          <span>Width:</span>
          <span>{config.WIDTH || 800}px</span>
        </div>
        <div className="info-row">
          <span>Height:</span>
          <span>{config.HEIGHT || 600}px</span>
        </div>
        <div className="info-row">
          <span>Zoom:</span>
          <span>{Math.round(config.ZOOM * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

// Layer Details Panel Component
function LayerDetailsPanel() {
  const { currentLayer, updateLayer } = useApp();

  if (!currentLayer) {
    return (
      <div className="details block" id="details_base">
        <h2 className="trn toggle toggle-full" data-target="toggle_details">Layer details</h2>
        <div className="content details-content" id="toggle_details">
          <p>No layer selected</p>
        </div>
      </div>
    );
  }

  const handleOpacityChange = (e) => {
    updateLayer(currentLayer.id, { opacity: parseInt(e.target.value, 10) });
  };

  return (
    <div className="details block" id="details_base">
      <h2 className="trn toggle toggle-full" data-target="toggle_details">Layer details</h2>
      <div className="content details-content" id="toggle_details">
        <div className="detail-row">
          <label>Name: {currentLayer.name}</label>
        </div>
        <div className="detail-row">
          <label>
            Opacity: {currentLayer.opacity}%
            <input
              type="range"
              min="0"
              max="100"
              value={currentLayer.opacity}
              onChange={handleOpacityChange}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div className="detail-row">
          <label>
            Visible:
            <input
              type="checkbox"
              checked={currentLayer.visible}
              onChange={(e) => updateLayer(currentLayer.id, { visible: e.target.checked })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// Layers Panel Component
function LayersPanel() {
  const { layers, currentLayer, setCurrentLayer, addLayer, removeLayer } = useApp();

  const handleNewLayer = () => {
    const newLayer = {
      id: Date.now(),
      name: `Layer ${layers.length + 1}`,
      type: 'image',
      visible: true,
      opacity: 100,
      x: 0,
      y: 0,
      width: 800,
      height: 600,
      order: layers.length + 1
    };
    addLayer(newLayer);
    setCurrentLayer(newLayer);
  };

  const handleDeleteLayer = (layerId) => {
    if (layers.length > 1) {
      removeLayer(layerId);
      if (currentLayer?.id === layerId) {
        setCurrentLayer(layers.find(l => l.id !== layerId));
      }
    }
  };

  return (
    <div className="layers block">
      <h2 className="trn">Layers</h2>
      <div className="content" id="layers_base">
        <div className="layers-controls">
          <button onClick={handleNewLayer} title="New Layer">+</button>
        </div>
        <div className="layers-list">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`layer-item ${currentLayer?.id === layer.id ? 'active' : ''}`}
              onClick={() => setCurrentLayer(layer)}
            >
              <span className="layer-visibility">
                {layer.visible ? '👁' : '○'}
              </span>
              <span className="layer-name">{layer.name}</span>
              {layers.length > 1 && (
                <button
                  className="layer-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLayer(layer.id);
                  }}
                  title="Delete Layer"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Sidebar Component
export default function Sidebar() {
  return (
    <div className="sidebar_right">
      <PreviewPanel />
      <ColorsPanel />
      <InformationPanel />
      <LayerDetailsPanel />
      <LayersPanel />
    </div>
  );
}
