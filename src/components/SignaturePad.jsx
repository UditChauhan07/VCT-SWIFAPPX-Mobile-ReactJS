import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const SignaturePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);

  const startDrawing = ({ nativeEvent }) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    convertToImage();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const convertToImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setSignatureData(dataUrl);
  };

  const uploadSignature = async () => {
    console.log(signatureData);
    // try {
    //   const response = await axios.post('/upload', { signature: signatureData });
    //   console.log('Signature uploaded:', response.data);
    // } catch (error) {
    //   console.error('Error uploading signature:', error);
    // }
  };
  function dataURLtoFile(dataUrl, filename) {
    // Extract the base64 data from the data URL
    const base64Data = dataUrl.split(",")[1];
    const byteCharacters = atob(base64Data);

    // Convert the base64 data into an array buffer
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Create a Blob from the array buffer
    const blob = new Blob([byteArray], { type: "image/png" });

    // Create a File from the Blob
    const file = new File([blob], filename, { type: "image/png" });

    return file;
  }

  // Usage example:
  useEffect(() => {
      const dataUrl = "data:image/png;base64,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";
    const filename = "signature.png";
    const file = dataURLtoFile(dataUrl, filename);
    console.log(file);
  }, [signatureData]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={200} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} style={{ border: "1px solid black" }} />
      <button onClick={uploadSignature}>Upload Signature</button>
    </div>
  );
};

export default SignaturePad;
