import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Styles from "./styles.module.css";

const DigitalSignature = () => {
  const sigCanvas = useRef(null);
  const [isNotSignedModal, setIsNotSignedModal] = useState(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const saveSignature = () => {
    const signatureImage = sigCanvas.current.getCanvas().toDataURL("image/png");
    // Further processing or sending the signature data (explained later)
    if (sigCanvas.current?.isEmpty()) {
      setIsNotSignedModal(true);
    } else {
      setIsNotSignedModal(true);

      console.log(signatureImage);
    }
  };

  // console.log(sigCanvas?.current?.getCanvas()?.toDataURL("image/png"), sigCanvas.current?.isEmpty());

  return (
    <div>
      <div className="bg-white">
        <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 500, height: 200 }} />
      </div>
      <div className={Styles.CodButton}>
        <button onClick={clearSignature}>Clear Signature</button>
        <button onClick={saveSignature}>Save Signature</button>
      </div>
    </div>
  );
};

export default DigitalSignature;
