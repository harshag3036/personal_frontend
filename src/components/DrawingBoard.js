import React, { useEffect, useRef, useState } from 'react';
import './DrawingBoard.css';

const DrawingBoard = ({ onSave, onClose, initialContent }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(5);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [brushStyle, setBrushStyle] = useState('round');
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 600 });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const updateCanvasWidth = () => {
      const container = containerRef.current;
      if (container) {
        setCanvasSize(prev => ({
          width: container.clientWidth,
          height: prev.height
        }));
      }
    };

    updateCanvasWidth();
    window.addEventListener('resize', updateCanvasWidth);
    return () => window.removeEventListener('resize', updateCanvasWidth);
  }, []);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;
    
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newHeight = Math.max(600, e.clientY - containerRect.top);
    
    setCanvasSize(prev => ({
      width: prev.width,
      height: newHeight
    }));
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing]);

  useEffect(() => {
    if (canvasSize.width && canvasSize.height) {
      const canvas = canvasRef.current;
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = brushStyle;
      ctx.lineJoin = brushStyle;

      if (initialContent) {
        const img = new Image();
        img.src = initialContent;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          saveToHistory();
        };
      } else {
        saveToHistory();
      }
    }
  }, [canvasSize, initialContent]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const scrollTop = containerRef.current?.scrollTop || 0;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: ((e.clientY - rect.top) * scaleY) + (scrollTop * scaleY)
    };
  };

  const startDrawing = (e) => {
    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext('2d');
    
    setIsDrawing(true);
    setStartX(pos.x);
    setStartY(pos.y);
    
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser' || tool === 'spray') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
    
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = brushStyle;
    ctx.lineJoin = brushStyle;
  };

  const drawShape = (ctx, shape, x, y) => {
    ctx.beginPath();
    
    switch (shape) {
      case 'rectangle':
        ctx.rect(startX, startY, x - startX, y - startY);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        break;
      case 'triangle':
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.lineTo(startX - (x - startX), y);
        ctx.closePath();
        break;
      case 'pentagon':
        const size = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const pointX = startX + size * Math.cos(angle);
          const pointY = startY + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(pointX, pointY);
          else ctx.lineTo(pointX, pointY);
        }
        ctx.closePath();
        break;
      case 'line':
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        break;
      default:
        break;
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext('2d');

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'spray') {
      const density = 50;
      for (let i = 0; i < density; i++) {
        const offsetX = (Math.random() - 0.5) * lineWidth * 2;
        const offsetY = (Math.random() - 0.5) * lineWidth * 2;
        ctx.fillStyle = color;
        ctx.fillRect(pos.x + offsetX, pos.y + offsetY, 1, 1);
      }
    } else {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasRef.current.width;
      tempCanvas.height = canvasRef.current.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      tempCtx.drawImage(canvasRef.current, 0, 0);
      tempCtx.strokeStyle = color;
      tempCtx.fillStyle = fillColor;
      tempCtx.lineWidth = lineWidth;
      
      drawShape(tempCtx, tool, pos.x, pos.y);
      
      tempCtx.stroke();
      if (tool !== 'line') {
        tempCtx.fill();
      }
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(tempCanvas, 0, 0);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveToHistory();
  };

  const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const printCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL();
    const windowContent = '<!DOCTYPE html>';
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(windowContent);
    printWindow.document.write('<img src="' + dataUrl + '" style="width:100%;">');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleSave = () => {
    if (onSave) {
      onSave(canvasRef.current.toDataURL());
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="drawing-board-embedded">
      <div className="drawing-toolbar">
        <div className="tool-group">
          <button 
            className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
            onClick={() => setTool('pencil')}
            title="Pencil"
          >✏️</button>
          <button 
            className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
            onClick={() => setTool('brush')}
            title="Brush"
          >🖌️</button>
          <button 
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >🧹</button>
        </div>

        <div className="tool-group">
          <button 
            className={`tool-btn ${tool === 'rectangle' ? 'active' : ''}`}
            onClick={() => setTool('rectangle')}
            title="Rectangle"
          >⬜</button>
          <button 
            className={`tool-btn ${tool === 'circle' ? 'active' : ''}`}
            onClick={() => setTool('circle')}
            title="Circle"
          >⭕</button>
          <button 
            className={`tool-btn ${tool === 'line' ? 'active' : ''}`}
            onClick={() => setTool('line')}
            title="Line"
          >📏</button>
        </div>

        <div className="tool-group">
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
            title="Color"
          />
          <input 
            type="color" 
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="color-picker"
            title="Fill Color"
          />
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="size-slider"
            title="Size"
          />
        </div>

        <div className="tool-group">
          <button className="tool-btn" onClick={undo} title="Undo">↩️</button>
          <button className="tool-btn" onClick={redo} title="Redo">↪️</button>
          <button className="tool-btn" onClick={clearCanvas} title="Clear">🗑️</button>
        </div>

        <div className="tool-group">
          <button className="tool-btn save-btn" onClick={handleSave}>
            💾 Save
          </button>
          <button className="tool-btn close-btn" onClick={handleClose}>
            ❌ Close
          </button>
        </div>
      </div>

      <div 
        className="drawing-canvas-container" 
        ref={containerRef}
        style={{ height: canvasSize.height }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="canvas"
        />
        <div 
          className="resize-handle"
          onMouseDown={handleResizeStart}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
