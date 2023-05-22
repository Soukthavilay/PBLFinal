import React, { useState } from "react";
import ProfileOption from "./ProfileOption";


function MyInfo() {
  const [isEdit, setIsEdit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  console.log(isEdit)

  return (
    <div className="profile">
      <ProfileOption />
      <div className="profile-content user-profile">
        <h2>User info</h2>
        <div className="profile-content-item">
          <span className="title">Name</span>
          <span className="subtitle">Koh Koh</span>
        </div>
        <div className="profile-content-item">
          <span className="title">Email</span>
          <span className="subtitle">kohcuto@gmail.com</span>
        </div>
        <div className="profile-content-item">
          <span className="title">Password</span>
          {isEdit ? (
            <form action="">
              <div className="form-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="oldPwd"
                  placeholder="Nhập mật khẩu cũ..."
                />
                <button
                  onClick={togglePassword}
                >aaa</button>
              </div>
              <div className="form-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="newPwd1"
                  placeholder="Nhập mật khẩu mới..."
                />
                <button
                  onClick={togglePassword}
                >aaa</button>
              </div>
              <div className="form-action">
                <button
                  className="update-pwd-btn"
                  onClick={() => setIsEdit(false)}
                >
                  Change password
                </button>
                <button
                  className="cancel-change-pwd"
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <div className="pwd-contain">
              <span className="subtitle">***********</span>
              <button
                className="update-pwd-btn"
                onClick={() => setIsEdit(true)}
              >
                Edit Password
              </button>
            </div>
          )}
        </div>
        <div className="profile-content-item">
          <span className="title">Phone number</span>
          <span className="subtitle">123456789</span>
        </div>
      </div>
    </div>
  );
}

export default MyInfo;
