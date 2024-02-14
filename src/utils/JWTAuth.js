import { login, register, logout } from "./utils/JWTAuth.js";
import axios from 'axios';
const SERVER_URL = "http://localhost/api_react";

login = async (data) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/api/login.php`;

  try {
      let response = await axios.post(LOGIN_ENDPOINT, data);
      if(response.status === 200 && response.data.jwt && response.data.expireAt){
          let jwt = response.data.jwt;
          let expire_at = response.data.expireAt;

          localStorage.setItem("access_token", jwt);
          localStorage.setItem("expire_at", expire_at);
      }


  } catch(e){
      console.log(e);
  }
}

register = async (data) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/api/register.php`;
  try {
      let response = await axios({
          method: 'post',
          responseType: 'json',
          url: SIGNUP_ENDPOINT,
          data: data
        });
  } catch(e){
      console.log(e);
  }
}

logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expire_at");
}

export { login, register, logout } 