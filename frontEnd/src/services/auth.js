import axios from "axios";
export const login = (username, password) => {
  console.log(" Log in:", username, password);
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
    url: "http://localhost:7204/authentication/login",
    data: {
      email: username,
      password,
    },
  };
  return tempResult;
  // return axios(configuration).then((result) => {
  //   console.log(result);
  //   return result.data;
  // });
};
export const signup = (fullname, username, password) => {
  console.log("Sign up:", fullname, username, password);
  const axios = require("axios");
  let data = JSON.stringify({
    email: "user@example.com",
    password: "string",
    fullName: "string",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://localhost:7204/authentication/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  // const configuration = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "post",
  //   url: "http://localhost:7204/authentication/register",
  //   data: {
  //     fullname,
  //     email: username,
  //     password,
  //   },
  // };

  // axios(configuration).then((result) => {
  //   console.log(result);
  //   return result.data;
  // });
};
