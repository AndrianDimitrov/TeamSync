import React from "react";
import "./AuthForm.css";
import { useState } from "react";
import email_icon from "../../assets/images/email.png";
import password_icon from "../../assets/images/password.png";
import { Link } from "react-router-dom";
import { login } from "../../services/auth";

const AuthForm = ({
  title,
  buttonText,
  hasForgottenPassword,
  promptText,
  promptButtonText,
  redirectUrl,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className="formBody">
      <div className="container">
        <div className="header">
          <div className="text">{title}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img className="imputIcon" src={email_icon} alt=""></img>
            <input
              className="imputField"
              type="email"
              placeholder="Email"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          <div className="input">
            <img className="imputIcon" src={password_icon} alt=""></img>
            <input
              className="imputField"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
        </div>
        {hasForgottenPassword ? (
          <div className="forgottenPassword">
            Forgotten password?
            <span className="fieldSpan">Click Here!</span>
          </div>
        ) : null}
        <div className="register">
          {promptText}
          <Link to={redirectUrl} className="fieldSpan">
            {promptButtonText}
          </Link>
        </div>
        <div className="submitContainer">
          <div className="submit" onClick={() => login(username, password)}>
            {buttonText}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
