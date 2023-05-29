import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";

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
        {passwordShown ? <AiOutlineEye /> : <FaRegEyeSlash/>}
      </span>
    </div>
  );
}

export default PasswordField;
