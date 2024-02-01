import axios from "axios";
export const login = (username, password) => {
  console.log(" Log in:", username, password);
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
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
  const tempResult = {
    $id: "1",
    flag: true,
    message: "Account created",
  };
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    url: "http://localhost:7204/authentication/register",
    data: {
      fullname,
      email: username,
      password,
    },
  };
  return tempResult;
  // axios(configuration).then((result) => {
  //   console.log(result);
  //   return result.data;
  // });
};
