import axios from "axios";

export const login = (username, password) => {
  console.log(" Log in:", username, password);
  const configuration = {
    method: "post",
    url: "http://localhost:7204/authentication/login",
    data: {
      email: username,
      password,
    },
  };
  return axios(configuration).then((result) => {
    console.log(result);
    return result.data;
  });
};
export const signup = (fullname, username, password) => {
  console.log("Sign up:", fullname, username, password);
  const configuration = {
    method: "post",
    url: "http://localhost:7204/authentication/sign-up",
    data: {
      fullname,
      email: username,
      password,
    },
  };
  axios(configuration).then((result) => {
    console.log(result);
    return result.data;
  });
};
