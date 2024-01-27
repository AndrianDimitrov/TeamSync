import React from "react";
import "./LoginPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
  return (
    <AuthForm
      title={"Log in"}
      buttonText={"Log in"}
      hasFullname={false}
      hasForgottenPassword={true}
      promptText={"Don't have an account?"}
      promptButtonText={"Register!"}
      redirectUrl={"/sign-up"}
    />
  );
};
export default LoginPage;
