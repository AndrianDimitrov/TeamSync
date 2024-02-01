import axios from "axios";
export const login = (username, password) => {
  console.log(" Log in:", username, password);
  let data = JSON.stringify({
    email: username,
    password,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://localhost:7204/authentication/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  // return {
  //   $id: 1,
  //   flag: true,
  //   message: "login successful",
  // };
  return axios.request(config).then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  });
};

export const signup = (fullname, username, password) => {
  console.log("Sign up:", fullname, username, password);
  let data = JSON.stringify({
    email: username,
    password,
    fullName,
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

  return axios.request(config).then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  });
};
