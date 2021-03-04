import React from "react";

const Email = ({ email }) => (
  <div className="email" data-email={email}>
    <p>{email}</p>
  </div>
);
export default Email;
