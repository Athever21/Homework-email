import React from "react";

const Loading = () => (
  <div style={{display: "flex", justifyContent: "center",paddingTop: "2rem"}}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;
