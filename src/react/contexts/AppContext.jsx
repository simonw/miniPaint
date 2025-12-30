import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

// Create the context
const AppContext = createContext(null);

// Default configuration matching the original config.js
const defaultConfig = {
  TRANSPARENCY: false,
  TRANSPARENCY_TYPE: 'squares',
  LANG: 'en',
  WIDTH: null,
  HEIGHT: null,
  visible_width: null,
  visible_height: null,
  COLOR: '#008000',
  ALPHA: 255,
  ZOOM: 1,
  SNAP: true,
  pixabay_key: '3ca2cd8af3fde33af218bea02-9021417',
  safe_search_can_be_disabled: true,
  google_webfonts_key: 'AIzaSyAC_Tx8RKkvN235fXCUyi_5XhSaRCzNhMg',
  layers: [],
  layer: null,
  need_render: false,
  need_render_changed_params: false,
  mouse: {},
  mouse_lock: null,
  swatches: {
    default: []
  },
  user_fonts: {},
  guides_enabled: true,
  guides: [],
  ruler_active: false,
  enable_autoresize_by_default: true,
  themes: ['dark', 'light', 'green'],
  FONTS: [
    "Arial", "Courier", "Impact", "Helvetica", "Monospace", "Tahoma",
    "Times New Roman", "Verdana", "Amatic SC", "Arimo", "Codystar",
    "Creepster", "Indie Flower", "Lato", "Lora", "Merriweather",
    "Monoton", "Montserrat", "Mukta", "Muli", "Nosifer", "Nunito",
    "Oswald", "Orbitron", "Pacifico", "PT Sans", "PT Serif",
    "Playfair Display", "Poppins", "Raleway", "Roboto", "Rubik",
    "Special Elite", "Tangerine", "Titillium Web", "Ubuntu"
  ],
  TOOLS: [
    { name: 'select', title: 'Select object tool', attributes: { auto_select: true } },
    { name: 'selection', attributes: {}, on_leave: 'on_leave' },
    { name: 'brush', attributes: { size: 4, pressure: false } },
    { name: 'pencil', attributes: { size: 1, pressure: false } },
    { name: 'pick_color', attributes: { global: false } },
    { name: 'erase', on_update: 'on_params_update', attributes: { size: 30, circle: true, strict: true } },
    { name: 'magic_erase', title: 'Magic Eraser Tool', attributes: { power: 15, anti_aliasing: true, contiguous: false } },
    { name: 'fill', attributes: { power: 5, anti_aliasing: false, contiguous: false } },
    { name: 'shape', on_activate: 'on_activate', title: 'Shapes (H)', attributes: { size: 3, stroke: '#00aa00' } },
    { name: 'line', visible: false, attributes: { size: 4 } },
    { name: 'arrow', visible: false, attributes: { size: 4 } },
    { name: 'rectangle', visible: false, attributes: { border_size: 4, border: true, fill: true, border_color: '#555555', fill_color: '#aaaaaa', radius: { value: 0, min: 0 }, square: false } },
    { name: 'ellipse', visible: false, attributes: { border_size: 4, border: true, fill: true, border_color: '#555555', fill_color: '#aaaaaa', circle: false } },
    { name: 'media', title: 'Search Images', on_activate: 'on_activate', attributes: { size: 30 } },
    { name: 'text', on_update: 'on_params_update', attributes: { size: 40 } },
    { name: 'gradient', attributes: { color_1: '#008000', color_2: '#ffffff', alpha: 0, radial: false, radial_power: 50 } },
    { name: 'clone', attributes: { size: 30, anti_aliasing: true } },
    { name: 'crop', on_update: 'on_params_update', on_leave: 'on_leave', attributes: { crop: true } },
    { name: 'blur', attributes: { size: 30, strength: 1 } },
    { name: 'sharpen', attributes: { size: 30 } },
    { name: 'desaturate', attributes: { size: 50, anti_aliasing: true } },
    { name: 'bulge_pinch', title: 'Bulge/Pinch Tool', attributes: { radius: 80, power: 50, bulge: true } },
    { name: 'animation', on_activate: 'on_activate', on_update: 'on_params_update', on_leave: 'on_leave', attributes: { play: false, delay: 400 } },
  ]
};

// Set the default tool to brush (index 2)
defaultConfig.TOOL = defaultConfig.TOOLS[2];

// Provider component
export function AppProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [layers, setLayers] = useState([]);
  const [currentLayer, setCurrentLayer] = useState(null);
  const [activeTool, setActiveTool] = useState(defaultConfig.TOOLS[2]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const canvasRef = useRef(null);

  // Initialize a default layer
  useEffect(() => {
    if (layers.length === 0) {
      const defaultLayer = {
        id: 1,
        name: 'Background',
        type: 'image',
        visible: true,
        opacity: 100,
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        width_original: 800,
        height_original: 600,
        order: 1
      };
      setLayers([defaultLayer]);
      setCurrentLayer(defaultLayer);

      // Update config
      setConfig(prev => ({
        ...prev,
        WIDTH: 800,
        HEIGHT: 600,
        layers: [defaultLayer],
        layer: defaultLayer
      }));
    }
  }, []);

  // Expose config globally for Playwright tests
  useEffect(() => {
    window.AppConfig = config;
    window.Layers = { layers, currentLayer };
  }, [config, layers, currentLayer]);

  const updateConfig = useCallback((updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const selectTool = useCallback((tool) => {
    setActiveTool(tool);
    setConfig(prev => ({ ...prev, TOOL: tool }));
  }, []);

  const addLayer = useCallback((layer) => {
    setLayers(prev => [...prev, layer]);
  }, []);

  const removeLayer = useCallback((layerId) => {
    setLayers(prev => prev.filter(l => l.id !== layerId));
  }, []);

  const updateLayer = useCallback((layerId, updates) => {
    setLayers(prev => prev.map(l =>
      l.id === layerId ? { ...l, ...updates } : l
    ));
  }, []);

  const pushUndo = useCallback((action) => {
    setUndoStack(prev => [...prev, action]);
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const action = undoStack[undoStack.length - 1];
      setUndoStack(prev => prev.slice(0, -1));
      setRedoStack(prev => [...prev, action]);
      // Execute undo action here
    }
  }, [undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const action = redoStack[redoStack.length - 1];
      setRedoStack(prev => prev.slice(0, -1));
      setUndoStack(prev => [...prev, action]);
      // Execute redo action here
    }
  }, [redoStack]);

  const value = {
    config,
    updateConfig,
    layers,
    setLayers,
    currentLayer,
    setCurrentLayer,
    activeTool,
    selectTool,
    addLayer,
    removeLayer,
    updateLayer,
    undoStack,
    redoStack,
    pushUndo,
    undo,
    redo,
    canvasRef
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
