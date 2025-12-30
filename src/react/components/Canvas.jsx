import React, { useRef, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

export default function Canvas() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const { config, updateConfig, activeTool, pushUndo, currentLayer } = useApp();
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set default canvas size
    canvas.width = config.WIDTH || 800;
    canvas.height = config.HEIGHT || 600;

    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update config with canvas reference
    updateConfig({ canvas: canvas });
  }, []);

  // Handle mouse down
  const handleMouseDown = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / config.ZOOM;
    const y = (e.clientY - rect.top) / config.ZOOM;

    isDrawing.current = true;
    lastPos.current = { x, y };

    // Handle different tools
    if (activeTool?.name === 'brush' || activeTool?.name === 'pencil') {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }, [config.ZOOM, activeTool]);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / config.ZOOM;
    const y = (e.clientY - rect.top) / config.ZOOM;

    // Handle different tools
    if (activeTool?.name === 'brush' || activeTool?.name === 'pencil') {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = config.COLOR;
      ctx.lineWidth = activeTool.attributes?.size || 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (activeTool?.name === 'erase') {
      const ctx = canvas.getContext('2d');
      const size = activeTool.attributes?.size || 30;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPos.current = { x, y };
  }, [config.ZOOM, config.COLOR, activeTool]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isDrawing.current) {
      isDrawing.current = false;
      pushUndo({ type: 'draw', tool: activeTool?.name });
    }
  }, [activeTool, pushUndo]);

  // Add event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div className="middle_area" id="middle_area">
      <canvas className="ruler_left" id="ruler_left"></canvas>
      <canvas className="ruler_top" id="ruler_top"></canvas>

      <div className="main_wrapper" id="main_wrapper" ref={wrapperRef}>
        <div className="canvas_wrapper" id="canvas_wrapper">
          <div id="mouse"></div>
          <div className="transparent-grid" id="canvas_minipaint_background"></div>
          <canvas
            ref={canvasRef}
            id="canvas_minipaint"
            style={{
              transform: `scale(${config.ZOOM})`,
              transformOrigin: 'top left'
            }}
          >
            <div className="trn error">
              Your browser does not support canvas or JavaScript is not enabled.
            </div>
          </canvas>
        </div>
      </div>
    </div>
  );
}
