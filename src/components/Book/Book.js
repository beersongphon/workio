import React, { Component } from "react";
import BookService from "../../service/BookService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: []
    }
  }

  componentDidMount() {
    BookService.getBook().then((res) => {
      this.setState({ book: res.data });
    });
  }

  // getBookContent(id) {
  //   this.props.history.push(`/book/${id}`);
  // }
  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Publisher</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Content</th>
                </tr>
              </thead>
              {/* <tbody>
                {this.state.book.map((result) => {
                  return (
                    <tr>
                      <th scope="row">{result.ISBN}</th>
                      <td>{result.title}</td>
                      <td>{result.author}</td>
                      <td>{result.publisher}</td>
                      <td>{result.category}</td>
                      <td>{result.price | 0 }</td>
                      <td>
                        <a>
                          <i className="fas fa-search-plus"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}
              <tbody>
                {this.state.book.map((item) =>
                  <tr key={item.ISBN}>
                    <th scope="row">{item.ISBN}</th>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.publisher}</td>
                    <td>{item.category}</td>
                    <td>{item.price | 0}</td>
                    <td>
                      {/* <a onClick={() => this.getBookContent(b.ISBN,b.title)}>
                          <i className="fas fa-search-plus"></i>
                        </a> */}
                      <Link to={`/books/${item.ISBN}/${item.title}`}>
                        <i className="fas fa-search-plus"></i>
                      </Link>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}
export default Book;
