import axios from "axios";
import TokenService from "./../service/TokenService";
 
// const jwtInterceoptor = axios.create({});
const jwtInterceoptor = axios.create({
  // baseURL: "http://localhost:8000/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
})
 
jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("token"));
  config.headers["Authorization"] = `Bearer ${tokensData.access_token}`;
  // config.headers.common["Authorization"] = `bearer ${tokensData.access_token}`;
  return config;
});
 
jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem("token"));
      const payload = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };
 
      const header = {
        'Authorization': 'Bearer ' + authData.refresh_token
      };
      let apiResponse =  await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {}, { headers: header });
      // let apiResponse = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`,
      //   // "http://localhost:4000/auth/refreshtoken",
      //   payload
      // );
      TokenService.updateLocalAccessToken(apiResponse.data.accessToken)
      // localStorage.setItem("token", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
export default jwtInterceoptor;
