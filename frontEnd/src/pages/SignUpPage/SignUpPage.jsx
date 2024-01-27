import React from "react";
import "./SignUpPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";

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
    />
  );
};

export default SignUpPage;
