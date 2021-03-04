import React, { useEffect } from "react";
import "./upload.css";

const Upload = ({ setFiles, clear }) => {
  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) =>
    Promise.resolve(clear()).then(() => handleFiles(e.dataTransfer.files));

  useEffect(() => {
    const upload = document.querySelector(".upload");

    const hightlight = () => upload.classList.add("highlight");
    const unhightlight = () => upload.classList.remove("highlight");

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      upload.addEventListener(eventName, preventDefaults, false);
    });
    ["dragenter", "dragover"].forEach((eventName) =>
      upload.addEventListener(eventName, hightlight, false)
    );
    ["dragleave", "drop"].forEach((eventName) =>
      upload.addEventListener(eventName, unhightlight, false)
    );

    upload.addEventListener("drop", handleDrop, false);

    return () => {
      upload.removeEventListener("drop", handleDrop, false);
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        upload.removeEventListener(eventName, preventDefaults, false);
      });
      ["dragenter", "dragover"].forEach((eventName) =>
        upload.removeEventListener(eventName, hightlight, false)
      );
      ["dragleave", "drop"].forEach((eventName) =>
        upload.removeEventListener(eventName, unhightlight, false)
      );
    };
  });

  const handleFiles = (files) => {
    setFiles(
      [...files].filter((x) => (x.name.substr(-3) === "txt" ? x : null))
    );
  };

  return (
    <div className="upload">
      <p>Drag & drop files</p>
      <p>or</p>
      <label htmlFor="file">Choose File</label>
      <input
        type="file"
        accept=".txt"
        id="file"
        style={{ display: "none" }}
        onChange={({ target }) => {
          Promise.resolve(clear()).then(() => {
            handleFiles(target.files);
            target.value = "";
          });
        }}
        multiple
      />
    </div>
  );
};

export default Upload;
