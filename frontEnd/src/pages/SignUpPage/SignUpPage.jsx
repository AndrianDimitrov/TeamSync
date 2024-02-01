import React from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { signup } from "../../services/auth";

const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSignUp = async (fullname, username, password) => {
    const signUpResult = await signup(fullname, username, password);
    if (signUpResult.flag) {
      enqueueSnackbar("You registered successfully!", {
        className: "snackbar",
        variant: "success",
      });
      navigate("/login");
    } else {
      enqueueSnackbar("Sign up failed!", {
        className: "snackbar",
        variant: "error",
      });
    }
  };
  return (
    <AuthForm
      title={"Sign Up"}
      buttonText={"Sign Up"}
      hasFullname={true}
      hasEmail={true}
      hasPassword={true}
      hasForgottenPassword={false}
      passwordPlaceholder={"Password"}
      promptText={"Already have an account?"}
      promptButtonText={"Click here!"}
      redirectUrl={"/login"}
      onSubmit={handleSignUp}
    />
  );
};

export default SignUpPage;
