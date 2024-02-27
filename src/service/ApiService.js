import axios from 'axios';
import TokenService from "./../service/TokenService";
import jwtInterceptor from "./../service/SetupInterceptors";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
class ApiService {

  // login(formValue){
  //   const apiHeader = { 'Content-Type': 'application/json' };
  //   return axios.post(`${USER_API_URL}/api_login.php`, formValue, { headers: apiHeader });
  // }

  login(loginForm) {
    const loginHeader = { 'Content-Type': 'application/json' };
    // const body = {
    //   'username': loginForm.username,
    //   'password': loginForm.password
    // };
    // return instance.post(`${process.env.REACT_APP_API_URL}/login`, loginForm, { headers: loginHeader });
    return axios.post(`${process.env.REACT_APP_API_URL}/login`, loginForm, { headers: loginHeader });
  }

  // getProfile() {
  //   // const token = TokenService.getToken();
  //   // const token = JSON.parse(localStorage.getItem('token'));
  //   const token = localStorage.getItem("access_token");
  //   const header = {
  //     'Authorization': 'Bearer ' + token
  //   };
  //   return instance.post(`${process.env.REACT_APP_API_URL}/authen`, {}, { headers: header });
  // }

  getProfile() {
    return jwtInterceptor.post(`${process.env.REACT_APP_API_URL}/authen`, {});
  }

  getRefresh() {
    const token = TokenService.getToken();
    // const token = JSON.parse(localStorage.getItem('token'));
    // const token = localStorage.getItem("refresh_token");
    const header = {
      'Authorization': 'Bearer ' + token.refresh_token
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {}, { headers: header });
  }

  getUsers(id) {
    let p = {
      id: id
    }
    return axios.post(`${process.env.REACT_APP_API_URL}/user`, p);
  }

  getWorkIOs(id, title) {
    // let p = {
    //   id: id,
    //   title: title
    // }
    return axios.get(`${process.env.REACT_APP_API_URL}/workio/${id}/${title}`);
  }

  insertWorkIO(formValue) {
    const apiHeader = { 'Content-Type': 'application/json' };
    return axios.post(`${process.env.REACT_APP_API_URL}/workio/save`, formValue, { headers: apiHeader });
  }

  updateWorkIO(formValue) {
    const apiHeader = { 'Content-Type': 'application/json' };
    return axios.put(`${process.env.REACT_APP_API_URL}/workio/update`, formValue, { headers: apiHeader });
  }


  getToken() {
    return localStorage.getItem('access_token')
    // localStorage.getItem('refresh_token', res.data.refresh_token)
    // return localStorage.getItem('token');
    // return JSON.parse(localStorage.getItem('token'));
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token != null) {
      return true
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}

// eslint-disable-next-line
export default new ApiService();
