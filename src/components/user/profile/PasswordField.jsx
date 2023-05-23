import React, { useState } from "react";

function PasswordField({ inputName, placeholder }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="form-group">
      <input
        type={!passwordShown ? "password" : "text"}
        name={inputName}
        placeholder={placeholder}
      />
      <span className="pwd-icon" onClick={togglePassword}>
        {passwordShown ? "Hide" : "Show"}
      </span>
    </div>
  );
}

export default PasswordField;
