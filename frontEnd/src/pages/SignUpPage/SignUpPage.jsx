import React from "react";
import "./SignUpPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { signup } from "../../services/auth";

const SignUpPage = () => {
  return (
    <AuthForm
      title={"Sign Up"}
      buttonText={"Sign Up"}
      hasFullname={true}
      hasForgottenPassword={false}
      promptText={"Already have an account?"}
      promptButtonText={"Click here!"}
      redirectUrl={"/login"}
      onSubmit={signup}
    />
  );
};

export default SignUpPage;
