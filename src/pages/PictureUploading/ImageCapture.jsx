import React, { useState, useRef } from 'react';

const CameraApp = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [stream, setStream] = useState(null);

  // Function to start capturing video
  const startCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Function to stop capturing video
  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Function to capture image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    // const dataUrl = canvas.toDataURL('image/jpeg');
    const dataUrl = canvas.toDataURL('image/png');
    setImageData(dataUrl);
    stopCapture(); // Stop capturing after image capture
  };
  console.log(imageData);

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={captureImage}>Capture Image</button>
      {imageData && <img src={imageData} alt="Captured"/>}
    </div>
  );
};

export default CameraApp;
