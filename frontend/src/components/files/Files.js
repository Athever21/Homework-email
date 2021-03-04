import React from "react";
import "./files.css";

import File from "./File";

const Files = ({files}) => {
  return(
    <div className="files">
      {files.map((x,i) => <File key={i} file={x} />)}
    </div>
  )
}

export default Files;