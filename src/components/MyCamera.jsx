import React, { useState } from "react";
import { Camera } from "@capacitor/camera";
import { dataUrlToFile } from "../utils/updation";
import { uploadPicture } from "../api/worker";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";

function MyCamera() {
  const [imageUrl, setImageUrl] = useState(null);
  const userGlobalState = useSelector((state) => state.userModule);
  const dataUrlToFile = (image, filename) => {
    // const dataUrl = image.toDataURL("image/png");
    const buff = Buffer.from(image, "base64");
    return new File([buff], filename, { type: "image/png" });
  };

  const takePicture = async () => {
    try {
      const options = {
        source: Camera.Source.Camera, // Use the rear camera
        quality: 100, // Image quality (0-100)
      };

      const image = await Camera.getPhoto(options);
      console.log(image);
      const url = image.webPath; // Web path for displaying the image in React
      setImageUrl(url);
      const file = dataUrlToFile(image.base64String, "image.png");
      console.log("file".file);

      await toUploadPictureAPICall(userGlobalState?.workerOrderId, file, userGlobalState?.details?.token);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
  //   const uploadImage = async () => {
  //     // console.log("image data",imageData);
  //     const file = dataUrlToFile(imageData, "image.png");
  //     console.log(file);
  //     await toUploadPictureAPICall(userGlobalState?.workerOrderId, file, userGlobalState?.details?.token);
  //   };
  // API Call to Upload Picture
  const toUploadPictureAPICall = async (item_id, file, accessToken) => {
    // setLoading(true);
    const result = await uploadPicture(item_id, file, accessToken);
    console.log(result);
    // setLoading(false);
    // if (result?.error) navigate("/");
    // else
    // if (result === 400) {
    //   setSuccessfully(true);
    //   setImageData(null);
    // } else {
    //   setPictureUpload(true);
    //   setImageData(null);
    //   navigate("/job-details");
  };

  return <div>{imageUrl ? <img src={imageUrl} alt="Captured Image" /> : <button onClick={takePicture}>Take Picture</button>}</div>;
}

export default MyCamera;
