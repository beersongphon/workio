import React, { Component } from "react";
import BookService from "../../../service/BookService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

class BookContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: this.props.match.params.title,
      data: [],
    };
    console.log(this.state);
  }

  componentDidMount() {
    BookService.getBookContent(this.state.id, this.state.title).then((res) => {
      console.log(res.data.data);
      this.setState({ data: res.data.data });
    });
  }
  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>{this.state.title}</h2>
            {this.state.data.map((item) =>
              <ul className="list-group">
                <li className="list-group-item">
                  บทที่ - {item.title}
                </li>
              </ul>
            )}
            <hr />
            <Link className="btn btn-primary" role="button" to={`/book`}>
              Back
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
export default BookContent;
