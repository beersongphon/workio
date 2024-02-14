import axios from 'axios';

const USER_API_URL = "http://localhost/api_react";

class BookService {

  getBook(){
    return axios.get(`${USER_API_URL}/api_get_book.php`);
  }

  getBookContent(id, title){
    return axios.get(`${USER_API_URL}/api_get_chapter.php`, { params: { isbn: id, title: title } });
  }
}

export default new BookService()
