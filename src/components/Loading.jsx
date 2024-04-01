import React from "react";
const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-transparent" style={{maxHeight:"100vh", minHeight:"80vh"}}>
      <div className="position-relative">
        <img src="/assets/loaderCircle.gif" width={"190px"} alt="swif-loader" />
      </div>
      <div className="position-absolute">
        <img src="/assets/Swif-loader.gif" width={"70px"} alt="swif-loader" />
      </div>
    </div>
  );
};

export default Loading;
