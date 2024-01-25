import React from "react";
import "./AuthForm.css";
import email_icon from "../../assets/images/email.png";
import password_icon from "../../assets/images/password.png";
import { Outlet, Link } from "react-router-dom";

const AuthForm = ({
  title,
  buttonText,
  hasForgottenPassword,
  promptText,
  promptButtonText,
  redirectUrl,
}) => {
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
            ></input>
          </div>
          <div className="input">
            <img className="imputIcon" src={password_icon} alt=""></img>
            <input
              className="imputField"
              type="password"
              placeholder="Password"
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
          <div className="submit">{buttonText}</div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
