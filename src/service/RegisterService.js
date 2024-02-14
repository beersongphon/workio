import axios from 'axios';

const USER_API_URL = "http://localhost/api_react";

class RegisterService {

  insertRegister(formValue){
    const apiHeader = { 'Content-Type': 'application/json' };
    return axios.post(`${USER_API_URL}/api_add_users.php`, formValue, { headers: apiHeader });
  }

  getProvince(){
    return axios.get(`${USER_API_URL}/api_get_province.php`);
  }
}

export default new RegisterService()
