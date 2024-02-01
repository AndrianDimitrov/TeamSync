import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import "./LoginPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../services/auth";
import AuthContext from "../../store/AuthContext";
import { redirect } from "react-router";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(AuthContext);
  const handleLogin = async (username, password) => {
    const loginResult = await login(username, password);
    if (loginResult.flag) {
      enqueueSnackbar("You logged in successfully!", {
        className: "snackbar",
        variant: "success",
      });
      setUser({ username });
    } else {
      enqueueSnackbar("Incorrect username or password!", {
        className: "snackbar",
        variant: "error",
      });
    }
  };
  return (
    <AuthForm
      title={"Log in"}
      buttonText={"Log in"}
      hasFullname={false}
      hasEmail={true}
      hasPassword={true}
      passwordPlaceholder={"Password"}
      hasForgottenPassword={true}
      promptText={"Don't have an account?"}
      promptButtonText={"Register!"}
      redirectUrl={"/sign-up"}
      onSubmit={handleLogin}
    />
  );
};
export default LoginPage;
