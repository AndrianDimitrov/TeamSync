import React, { useContext } from "react";
import "./LoginPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../services/auth";
import AuthContext from "../../store/AuthContext";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const handleLogin = (username, password) => {
    login(username, password);
    setUser({ username });
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
