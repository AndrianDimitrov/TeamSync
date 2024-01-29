import React from "react";
import "./AuthForm.css";
import { useState } from "react";
import email_icon from "../../assets/images/email.png";
import person_icon from "../../assets/images/person.png";
import password_icon from "../../assets/images/password.png";
import { Link } from "react-router-dom";
import { login, signup } from "../../services/auth";

const AuthForm = ({
  title,
  buttonText,
  hasFullname,
  hasEmail,
  hasPassword,
  hasForgottenPassword,
  promptText,
  promptButtonText,
  redirectUrl,
  onSubmit,
}) => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    if (!onSubmit) return;
    if (buttonText === "Log in") {
      onSubmit(username, password);
    } else {
      onSubmit(fullname, username, password);
    }
  };
  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  return (
    <div className="formBody">
      <div className="container">
        <div className="header">
          <div className="text">{title}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {hasFullname ? (
            <div className="input">
              <img className="imputIcon" src={person_icon} alt=""></img>
              <input
                className="imputField"
                type="Full Name"
                placeholder="Full Name"
                value={fullname}
                onChange={handleFullnameChange}
              ></input>
            </div>
          ) : null}
          { hasEmail ? (
          <div className="input">
            <img className="imputIcon" src={email_icon} alt=""></img>
            <input
              className="imputField"
              type="email"
              placeholder="Email"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>) : null
          }
          {hasPassword ? (
          <div className="input">
            <img className="imputIcon" src={password_icon} alt=""></img>
            <input
              className="imputField"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>) : null
}
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
          <div className="submit" onClick={handleSubmit}>
            {buttonText}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
