import React, { useState, useRef } from 'react';
import Styles from './styles.module.css'

const CustomSignaturePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas className={Styles.Canvas}
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: '1px solid #F0F0F0', backgroundColor: '#fff' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
      />

<div className={Styles.CodButton}>
                    <a onClick={clearCanvas} href='/signature-screen' className={Styles.Btn1}>Clear</a>
                    <a>Confirm</a>

                </div>
      
    </div>
  );
};

export default CustomSignaturePad;
