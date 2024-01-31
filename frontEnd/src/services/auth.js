import axios from "axios";

export const login = (username, password) => {
  console.log(" Log in:", username, password);

  const configuration = {
    method: "post",
    url: "http://localhost:5173/authentication/login",
    data: {
      email: username,
      password,
    },
  };
  axios(configuration)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const signup = (fullname, username, password) => {
  console.log("Sign up:", fullname, username, password);
  const configuration = {
    method: "post",
    url: "http://localhost:5173/authentication/sign-up",
    data: {
      fullname,
      email: username,
      password,
    },
  };
  axios(configuration)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
