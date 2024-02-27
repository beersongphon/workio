class TokenService {
    getLocalRefreshToken() {
      // const token = JSON.parse(localStorage.getItem("token"));
      // return token?.refresh_token;
      return localStorage.getItem("refresh_token");
    }
  
    getLocalAccessToken() {
      // const token = JSON.parse(localStorage.getItem("token"));
      // return token?.access_token;
      return localStorage.getItem("access_token");
    }
  
    updateLocalAccessToken(tokens) {
      // let token = JSON.parse(localStorage.getItem("token"));
      // token.access_token = tokens;
      // localStorage.setItem("token", JSON.stringify(token));
      let token = localStorage.getItem("access_token");
      token = tokens;
      localStorage.setItem("access_token", token);
    }
  
    getToken() {
      // return JSON.parse(localStorage.getItem("token"));
      localStorage.getItem("access_token");
      localStorage.getItem("refresh_token");
    }
  
    setToken(token) {
      //   localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);
    }

    removeUser() {
      // localStorage.removeItem("token");
      localStorage.clear();
    }
  }
  
  export default new TokenService();