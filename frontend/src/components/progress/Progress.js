import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import event from "../../events";
import "./progress.css";

const Progress = forwardRef(({ length }, ref) => {
  const [percentage, setPercentage] = useState(0);
  const [curr, setCurr] = useState(0);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    hideBar: () => {
      setShow(false);
      setPercentage(0);
      setCurr(0);
    },
  }));

  useEffect(() => {
    const addProgress = () => {
      setCurr((c) => c + 1);
      setPercentage((p) =>
        curr + 1 !== length ? Math.floor(p + 100 / length) : 100
      );
    };
    const show = () => setShow(true);

    event.on("send", show);
    event.on("response", addProgress);

    return () => {
      event.off("send", show);
      event.off("response", addProgress);
    };
  }, [length, curr]);

  return (
    show && (
      <div className="progress">
        <label htmlFor="files">{percentage}%</label>
        <progress id="files" max="100" value={percentage}></progress>
      </div>
    )
  );
});

export default Progress;
