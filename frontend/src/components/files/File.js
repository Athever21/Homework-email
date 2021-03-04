import React, { useState, useEffect } from "react";
import event from "../../events";

import Email from "./Email";

const File = ({ file }) => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => {
      setEmails(fr.result.trim().split("\n"));
    };
    fr.readAsText(file);
  }, [file]);

  useEffect(() => {
    if (error.error === "invalid_email_address") {
      for (const faulty of error.emails) {
        const div = document.querySelector(`[data-email="${faulty}"]`);
        if (div.children.length === 1) {
          const p = document.createElement("p");
          p.classList.add("err");
          p.innerText = "Invalid email";
          div.appendChild(p);
        }
      }
    }
  }, [error]);

  useEffect(() => {
    const send = async () => {
      try {
        const res = await fetch(
          "https://toggl-hire-frontend-homework.vercel.app/api/send",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emails: emails }),
          }
        );

        if (res.status === 200) {
          const fileDiv = document.querySelector(`[data-file="${file.name}"]`);
          fileDiv.style.background = "var(--file-correct)";
        } else {
          throw res;
        }
      } catch (err) {
        const error = await err.json();
        const fileDiv = document.querySelector(`[data-file="${file.name}"]`);
        fileDiv.style.background = "var(--file-incorrect)";
        setError(error);
      } finally {
        event.emit("response");
      }
    };

    event.on("send", send);

    return () => {
      event.off("send", send);
    };
  }, [emails, file]);

  return (
    <div className="file" data-file={file.name}>
      <div className="header">
        <h2>{file.name}</h2>
        <p>Total emails: {emails.length}</p>
      </div>
      {error.error && <p className="error">Error: {error.error}</p>}
      <div className="emails">
        {emails.map((x, i) => (
          <Email key={i} email={x} faulty={error.emails} />
        ))}
      </div>
    </div>
  );
};

export default File;
