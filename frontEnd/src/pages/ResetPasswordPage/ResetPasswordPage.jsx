import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const ResetPasswordPage = () => {
  return (
    <AuthForm
      title={"Reset Your Password"}
      buttonText={"Confirm"}
      hasPassword={true}
      passwordPlaceholder={"New password"}
    />
  );
};
export default ResetPasswordPage;
