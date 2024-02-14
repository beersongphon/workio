import axios from 'axios';

const USER_API_URL = "https://newsapi.org/v2/top-headlines?country=th&apiKey=1bc643bdae2744b9b49ad3e212d664a4";
class NewsService {

  getNews(){
    return axios.get(`${USER_API_URL}`);
  }
}

export default new NewsService()
