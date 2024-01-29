import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const ForgottenPasswordPage = () => {
  return (
    <AuthForm
      title={"Forgot Your Password?"}
      buttonText={"Reset your password"}
      hasFullname={false}
      hasEmail={true}
    />
  );
};
export default ForgottenPasswordPage;
