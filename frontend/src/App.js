import React, { lazy, Suspense, useState, useRef } from "react";
import event from "./events";

import Loading from "./components/Loading";

const Upload = lazy(() => import("./components/upload/Upload"));
const Files = lazy(() => import("./components/files/Files"));
const Progress = lazy(() => import("./components/progress/Progress"));

function App() {
  const [files, setFiles] = useState([]);
  const [sendFlag, setSendFlag] = useState(false);
  const ref = useRef();

  const send = () => {
    if (sendFlag || files.length === 0) return;
    setSendFlag(true);
    event.emit("send");
  };

  const clear = () => {
    setFiles([]);
    setSendFlag(false);
    ref.current.hideBar();
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="container">
          <Upload setFiles={setFiles} clear={clear} />
          <Progress length={files.length} ref={ref} />
          <div className="buttons">
            <button onClick={send}>Send</button>
            <button onClick={clear}>Clear files</button>
          </div>
          <Files files={files} />
        </div>
      </Suspense>
    </>
  );
}

export default App;
